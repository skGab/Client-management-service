import { Injectable, Logger } from '@nestjs/common';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { PrismaService } from '../services/prisma-adapter.service';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { ClientTableVo } from 'src/domain/valueObject/client-table.vo';
import { ContractEntity } from 'src/domain/entity/contract.entity';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';

@Injectable()
export class ClientRepositoryService implements ClientRepository {
  private logger = new Logger(ClientRepositoryService.name);

  constructor(private prisma: PrismaService) {}

  // FIND ALL CLIENTS
  async findAll(): Promise<ClientTableVo[]> {
    try {
      // FEETCHING CLIENT
      const response = await this.prisma.basicClient.findMany({
        // WITH SPECIFIC FIELDS
        select: {
          id: true,
          nome_cliente: true,
          site: true,
          email: true,
          telefone: true,
          cnpj: {
            select: {
              contracts: {
                select: {
                  tipo: true,
                  termino_vigencia: true,
                },
              },
            },
          },
        },
      });

      // RETURN NULL IF ANY CLIENTS ON DB
      if (response.length === 0 || response === null) return null;

      // MAP REPSONSE TO VALUE OBJECT
      const clientsVo = response.map(
        (client) =>
          new ClientTableVo(
            client.id,
            client.nome_cliente,
            client.site,
            client.email,
            client.telefone,
            client.cnpj.flatMap((c) => {
              return c.contracts.map((contract) => {
                return {
                  tipo: contract.tipo,
                  termino_vigencia: contract.termino_vigencia,
                };
              });
            }),
          ),
      );

      // RETURNING VO
      return clientsVo;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  // FIND CLIENT BY ID
  async findOne(id: string): Promise<ClientCnpjEntity> {
    try {
      // GET THE CLIENT
      const client = await this.prisma.clientCnpj.findUnique({
        where: { id: id },
        include: { contracts: true },
      });

      if (client === null) return null;

      // MAPT THE CONTRACTS TO CONTRACTENTITY
      const contracts = client.contracts.map((contract) => {
        return new ContractEntity({
          id: contract.id,
          cliente_novo: contract.cliente_novo,
          cnpj_cpf: contract.cnpj_cpf,
          razao_social: contract.razao_social,
          nome_fantasia: contract.nome_fantasia,
          nome_contato: contract.nome_contato,
          email_contato: contract.email_contato,
          servicos_prestados: contract.servicos_prestados as string[],
          emissao_de_nota: contract.emissao_de_nota,
          retencao_iss_emissao_nota_fiscal:
            contract.retencao_iss_emissao_nota_fiscal,
          forma_recebimento: contract.forma_recebimento,
          tipo: contract.tipo,

          //   RECORRENTE
          inicio_vigencia: contract.inicio_vigencia,
          termino_vigencia: contract.termino_vigencia,
          periodicidade: contract.periodicidade,
          valor_do_periodo: contract.valor_do_periodo,
          observacoes_adicionais: contract.observacoes_adicionais,

          //   AVULSO
          valor_total_servicos: contract.valor_total_servicos,
          numero_parcelas: contract.numero_parcelas,
          data_vencimento: contract.data_vencimento,
          observacoes_adicionais_nota_fiscal:
            contract.observacoes_adicionais_nota_fiscal,
        });
      });

      // MAP TO ENTITY
      const clientEntity = new ClientCnpjEntity(
        {
          id: client.id,
          razao_social: client.razao_social,
          nome_cliente: client.nome_cliente,
          site: client.site,
          cnpj_cpf: client.cnpj_cpf,
          insc_estadual: client.insc_estadual,
          email: client.email,

          //   INFO ATENDIMENTO
          endereco_atendimento: client.endereco_atendimento,
          bairro: client.bairro,
          cep: client.cep,
          cidade: client.cidade,
          estado: client.estado,
          ddd: client.ddd,
          fax: client.fax,
          telefone: client.telefone,

          //   INFO FATURAMENTO
          endereco_faturamento: client.endereco_faturamento,
          bairro_faturamento: client.bairro_faturamento,
          cep_faturamento: client.cep_faturamento,
          cidade_faturamento: client.cidade_faturamento,
          estado_faturamento: client.estado_faturamento,
          ddd_faturamento: client.ddd_faturamento,
          fax_faturamento: client.fax_faturamento,
          telefone_faturamento: client.telefone_faturamento,

          //   RESPONSAVEL FINANCEIRO
          responsavel_financeiro: client.responsavel_financeiro,
          ddd_financeiro: client.ddd_financeiro,
          telefone_financeiro: client.telefone_financeiro,
          email_financeiro: client.email_financeiro,

          // REPRESENTANTE LEGAL (Obrigatorio)
          nome_representante: client.nome_representante,
          estado_civil_representante: client.estado_civil_representante,
          profissao_representante: client.profissao_representante,
          rg_representante: client.rg_representante,
          cpf_representante: client.cpf_representante,
          email_representante: client.email_representante,
          telefone_representante: client.telefone_representante,
          nascimento_representante: client.nascimento_representante,

          // INFO BOLETOS E NOTAS FISCAIS
          email_boleto_notas: client.email_boleto_notas,

          // TESTEMUNHA / SEGUNDO CONTATO
          nome_segundo_contato: client.nome_segundo_contato,
          estado_civil_segundo_contato: client.estado_civil_segundo_contato,
          profissao_segundo_contato: client.profissao_segundo_contato,
          rg_segundo_contato: client.rg_segundo_contato,
          cpf_segundo_contato: client.cpf_segundo_contato,
          email_segundo_contato: client.email_segundo_contato,
          telefone_segundo_contato: client.telefone_segundo_contato,
          nascimento_segundo_contato: client.nascimento_segundo_contato,

          //   TERCEIRO CONTATO
          nome_terceiro_contato: client.nome_terceiro_contato,
          estado_civil_terceiro_contato: client.estado_civil_terceiro_contato,
          profissao_terceiro_contato: client.responsavel_financeiro,
          rg_terceiro_contato: client.rg_terceiro_contato,
          cpf_terceiro_contato: client.cpf_terceiro_contato,
          email_terceiro_contato: client.email_terceiro_contato,
          telefone_terceiro_contato: client.telefone_terceiro_contato,
          nascimento_terceiro_contato: client.nascimento_terceiro_contato,
        },
        contracts,
      );

      // RETURN IT
      return clientEntity;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  // CREATE BASIC CLIENT
  async createBasic(clientEntity: ClientEntity): Promise<{ status: string }> {
    try {
      // MAP ENTITY TO PRISMA CLIENT
      const clientModel = this.prisma.mapToPrismaBasicClient(clientEntity);

      // CHECK IF CLIENT EMAIL ALREADY EXISTS ON THE DB
      const client = await this.prisma.basicClient.findUnique({
        where: {
          email: clientModel.email,
        },
      });

      // SAVE NEW CLIENT
      if (client === null) {
        await this.prisma.basicClient.create({
          data: clientModel,
        });

        return { status: 'Novo cliente Registrado' };
      }

      return { status: 'Cliente já registrado' };
    } catch (error) {
      this.logger.error(error);
      return { status: 'Erro interno no servidor' };
    }
  }

  // CREATE BASIC CLIENT
  async createCnpj(
    clientCnpjEntity: ClientCnpjEntity,
  ): Promise<{ status: string }> {
    try {
      //FIND RELATED CLIENT BY CNPJ OR CPF
      const basicClient = await this.prisma.basicClient.findUnique({
        select: {
          id: true,
        },
        where: {
          email: clientCnpjEntity.clientCnpj.email,
        },
      });

      // CHECK IF CLIENT EXISTS
      if (!basicClient || basicClient === null) {
        return {
          status: 'É necessario cadastrar o CNPJ com mesmo email do cliente.',
        };
      }

      // MAP ENTITY TO PRISMA CLIENT
      const clientModel = this.prisma.mapToPrismaCnpjClient(
        clientCnpjEntity,
        basicClient,
      );

      // CHECK IF CLIENT EMAIL ALREADY EXISTS ON THE DB
      const clientCnpj = await this.prisma.clientCnpj.findUnique({
        where: {
          email: clientModel.email,
        },
      });

      // SAVE NEW CLIENT
      if (clientCnpj === null) {
        await this.prisma.clientCnpj.create({
          data: clientModel,
        });

        return { status: 'Novo CNPJ Registrado' };
      }

      return { status: 'CNPJ já registrado' };
    } catch (error) {
      this.logger.error(error);
      return { status: 'Erro interno no servidor' };
    }
  }

  // update(): void {
  //   throw new Error('Method not implemented.');
  // }
  // delete(): void {
  //   throw new Error('Method not implemented.');
  // }
}
