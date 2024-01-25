import { ContractEntity } from './../../domain/entity/contract.entity';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../services/prisma-adapter.service';
import { ContractRepository } from 'src/domain/repository/contract.repository';
import { ExpiringContractVo } from 'src/domain/valueObject/expiring-contract.vo';

@Injectable()
export class ContractRepositoryService implements ContractRepository {
  private logger = new Logger(ContractRepositoryService.name);

  constructor(private prisma: PrismaService) {}

  // findAll(): ClientEntity[] {
  //   throw new Error('Method not implemented.');
  // }

  // GET CONTRACT BY CNPJ
  async getContractById(id: { id: string }): Promise<ContractEntity | string> {
    try {
      const contracts = await this.prisma.contract.findUnique({
        where: { id: id.id },
      });

      if (contracts === null) return 'Contrato não encontrado';

      // MAP THE OBJECT TO ENTITY
      const contractEntity = new ContractEntity({
        id: id.id,
        cliente_novo: contracts.cliente_novo,
        cnpj_cpf: contracts.cnpj_cpf,
        razao_social: contracts.razao_social,
        nome_fantasia: contracts.nome_fantasia,
        nome_contato: contracts.nome_contato,
        email_contato: contracts.email_contato,
        servicos_prestados: contracts.servicos_prestados as string[],
        emissao_de_nota: contracts.emissao_de_nota,
        retencao_iss_emissao_nota_fiscal:
          contracts.retencao_iss_emissao_nota_fiscal,
        forma_recebimento: contracts.forma_recebimento,
        tipo: contracts.tipo,

        //   RECORRENTE
        inicio_vigencia: contracts.inicio_vigencia,
        termino_vigencia: contracts.termino_vigencia,
        periodicidade: contracts.periodicidade,
        valor_do_periodo: contracts.valor_do_periodo,
        observacoes_adicionais: contracts.observacoes_adicionais,

        //   AVULSO
        valor_total_servicos: contracts.valor_do_periodo,
        numero_parcelas: contracts.numero_parcelas,
        data_vencimento: contracts.data_vencimento,
        observacoes_adicionais_nota_fiscal:
          contracts.observacoes_adicionais_nota_fiscal,
      });

      return contractEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }

  // CREATE CONTRACT
  async create(contractEntity: ContractEntity): Promise<{ status: string }> {
    //FIND RELATED CLIENT BY CNPJ OR CPF
    const client = await this.prisma.clientCnpj.findUnique({
      select: {
        id: true,
      },
      where: {
        cnpj_cpf: contractEntity.contract.cnpj_cpf,
      },
    });

    // CHECK IF CLIENT EXISTS
    if (!client || client === null) {
      return {
        status:
          'É necessario cadastrar o cliente com mesmo cnpj/cpf, antes de enviar o contrato.',
      };
    }

    // MAP ENTITY TO PRISMA CLIENT
    const contractModel = this.prisma.mapToPrismaContract(
      contractEntity,
      client,
    );

    // SAVE NEW CONTRACT
    await this.prisma.contract.create({
      data: contractModel,
    });

    return { status: 'Novo Contrato Registrado' };
  }

  // GET EXPIRING CONTRACTS
  async getExpiring(): Promise<ExpiringContractVo[]> {
    // Get current date in ISO format (YYYY-MM-DD)
    const currentDate = new Date();
    const currentDateIso = currentDate.toISOString().split('T')[0];

    // Calculate the date 10 days from now
    const tenDaysLater = new Date();
    tenDaysLater.setDate(currentDate.getDate() + 10);
    const tenDaysLaterIso = tenDaysLater.toISOString().split('T')[0];

    // SEARCH CONTRACTS ON DB BY DATE TIME
    const expiringContracts = await this.prisma.contract.findMany({
      select: {
        id: true,
        cnpj_cpf: true,
        email_contato: true,
        tipo: true,
        data_vencimento: true,
        termino_vigencia: true,
      },
      where: {
        OR: [
          // FIRST CONDITION
          {
            termino_vigencia: {
              gte: currentDateIso,
              lte: tenDaysLaterIso,
            },
          },
          // SECONDG CONDITION
          {
            data_vencimento: {
              gte: currentDateIso,
              lte: tenDaysLaterIso,
            },
          },
        ],
      },
    });

    // MAP THE RESPONSE TO VO OBJECT
    const expiringContractVo = expiringContracts.map(
      (contract) =>
        new ExpiringContractVo(
          contract.id,
          contract.cnpj_cpf,
          contract.email_contato,
          contract.tipo,
          contract.data_vencimento,
          contract.termino_vigencia,
        ),
    );

    // RETURN THE VO
    return expiringContractVo;
  }

  // update(): void {
  //   throw new Error('Method not implemented.');
  // }
  // delete(): void {
  //   throw new Error('Method not implemented.');
  // }
}
