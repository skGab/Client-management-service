import { Injectable, Logger } from '@nestjs/common';
import { ContractEntity } from './../../domain/entity/contract.entity';
import { ContractRepository } from 'src/domain/repository/contract.repository';
import { ExpiringContractVo } from 'src/domain/valueObject/expiring-contract.vo';
import { RepositoryResponse } from 'src/domain/repository/client.repository';
import { PrismaService } from '../services/prisma-adapter.service';

@Injectable()
export class ContractRepositoryService implements ContractRepository {
  private logger = new Logger(ContractRepositoryService.name);

  constructor(private prisma: PrismaService) { }

  // GET CONTRACT BY CNPJ
  async getContractById(id: {
    id: string;
  }): Promise<RepositoryResponse<ContractEntity>> {
    try {
      const contract = await this.prisma.contract.findUnique({
        where: { id: id.id },
      });

      if (contract === null || !contract)
        return new RepositoryResponse<ContractEntity>(
          false, null,
          'Contrato não encontrado',
        );

      // MAP THE OBJECT TO ENTITY
      const contractEntity = new ContractEntity({
        id: id.id,
        tipo: contract.tipo,
        cnpj_cpf: contract.cnpj_cpf,
        inicio_vigencia: contract.inicio_vigencia,
        termino_vigencia: contract.termino_vigencia,
        data_vencimento: contract.data_vencimento,
        servicos_prestados: contract.servicos_prestados as string[],
        valor_total: contract.valor_total,
        observacoes_adicionais: contract.observacoes_adicionais,

        //   RECORRENTE
        periodicidade: contract.periodicidade,

        //   AVULSO
        numero_parcelas: contract.numero_parcelas,
      });

      return new RepositoryResponse<ContractEntity>(
        true,
        contractEntity,
      );
    } catch (error) {
      this.logger.error(error);
      return new RepositoryResponse<ContractEntity>(
        false,
        null,
        null,
        error,
      );
    }
  }

  // CREATE CONTRACT
  async create(
    contractEntity: ContractEntity,
  ): Promise<RepositoryResponse<string>> {
    try {
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
        return new RepositoryResponse<string>(
          false, null,
          'É necessario ter um cliente com mesmo cnpj/cpf cadastrado, antes de enviar o contrato.',
        );
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

      return new RepositoryResponse<string>(true, null, 'Novo Contrato Registrado');
    } catch (error) {
      this.logger.error(error);
      return new RepositoryResponse<string>(false, null, null, error);
    }
  }

  // GET EXPIRING CONTRACTS
  async getExpiring(): Promise<
    RepositoryResponse<ExpiringContractVo[]>
  > {
    try {
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
          valor_total: true,
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

      // CHECK IF HAS CONTRACTS ON THE ARRAY
      if (expiringContracts.length == 0)
        return new RepositoryResponse<ExpiringContractVo[]>(
          true, null,
          'Nenhum contrato para vencer',
        );

      // MAP THE RESPONSE TO VO OBJECT
      const expiringContractVo = expiringContracts.map(
        (contract) =>
          new ExpiringContractVo(
            contract.id,
            contract.cnpj_cpf,
            contract.valor_total,
            contract.tipo,
            contract.data_vencimento,
            contract.termino_vigencia,
          ),
      );

      // RETURN THE VO
      return new RepositoryResponse<ExpiringContractVo[]>(
        true,
        expiringContractVo,
      );
    } catch (error) {
      this.logger.error(error);
      return new RepositoryResponse<ExpiringContractVo[]>(
        true,
        null,
        null,
        error,
      );
    }
  }
}
