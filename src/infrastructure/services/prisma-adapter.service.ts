import { ContractEntity } from './../../domain/entity/contract.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';
import { BasicClientEntity } from 'src/domain/entity/basic-client.entity';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // MAP TO BASIC CLIENT PRISMA MODEL
  public mapToPrismaBasicClient(
    clientEntity: BasicClientEntity,
  ): Prisma.BasicClientCreateInput {
    return {
      id: clientEntity.getId(),
      nome_cliente: clientEntity.basicClient.nome_cliente,
      site: clientEntity.basicClient.site,
      email: clientEntity.basicClient.email,
      telefone: clientEntity.basicClient.telefone,
    };
  }

  // MAP TO CLIENT CNPJ PRISMA MODEL
  public mapToPrismaCnpjClient(
    clientCnpjEntity: ClientCnpjEntity,
    basicClient: { id: string },
  ): Prisma.ClientCnpjCreateInput {
    return {
      id: clientCnpjEntity.getId(),
      razao_social: clientCnpjEntity.clientCnpj.razao_social,
      nome_cliente: clientCnpjEntity.clientCnpj.nome_cliente,
      site: clientCnpjEntity.clientCnpj.site,
      cnpj_cpf: clientCnpjEntity.clientCnpj.cnpj_cpf,
      insc_estadual: clientCnpjEntity.clientCnpj.insc_estadual,
      email: clientCnpjEntity.clientCnpj.email,

      //   INFO ATENDIMENTO
      endereco_atendimento: clientCnpjEntity.clientCnpj.endereco_atendimento,
      bairro: clientCnpjEntity.clientCnpj.bairro,
      cep: clientCnpjEntity.clientCnpj.cep,
      cidade: clientCnpjEntity.clientCnpj.cidade,
      estado: clientCnpjEntity.clientCnpj.estado,
      ddd: clientCnpjEntity.clientCnpj.ddd,
      fax: clientCnpjEntity.clientCnpj.fax,
      telefone: clientCnpjEntity.clientCnpj.telefone,

      //   INFO FATURAMENTO
      endereco_faturamento: clientCnpjEntity.clientCnpj.endereco_faturamento,
      bairro_faturamento: clientCnpjEntity.clientCnpj.bairro_faturamento,
      cep_faturamento: clientCnpjEntity.clientCnpj.cep_faturamento,
      cidade_faturamento: clientCnpjEntity.clientCnpj.cidade_faturamento,
      estado_faturamento: clientCnpjEntity.clientCnpj.estado_faturamento,
      ddd_faturamento: clientCnpjEntity.clientCnpj.ddd_faturamento,
      fax_faturamento: clientCnpjEntity.clientCnpj.fax_faturamento,
      telefone_faturamento: clientCnpjEntity.clientCnpj.telefone_faturamento,

      //   RESPONSAVEL FINANCEIRO
      responsavel_financeiro:
        clientCnpjEntity.clientCnpj.responsavel_financeiro,
      ddd_financeiro: clientCnpjEntity.clientCnpj.ddd_financeiro,
      telefone_financeiro: clientCnpjEntity.clientCnpj.telefone_financeiro,
      email_financeiro: clientCnpjEntity.clientCnpj.email_financeiro,

      // REPRESENTANTE LEGAL
      nome_representante: clientCnpjEntity.clientCnpj.nome_representante,
      estado_civil_representante:
        clientCnpjEntity.clientCnpj.estado_civil_representante,
      profissao_representante:
        clientCnpjEntity.clientCnpj.profissao_representante,
      rg_representante: clientCnpjEntity.clientCnpj.rg_representante,
      cpf_representante: clientCnpjEntity.clientCnpj.cpf_representante,
      email_representante: clientCnpjEntity.clientCnpj.email_representante,
      telefone_representante:
        clientCnpjEntity.clientCnpj.telefone_representante,
      nascimento_representante:
        clientCnpjEntity.clientCnpj.nascimento_representante,

      // INFO BOLETOS E NOTAS FISCAIS
      emissao_notas: clientCnpjEntity.clientCnpj.emissao_nota,
      forma_recebimento: clientCnpjEntity.clientCnpj.forma_recebimento,
      retencao_iss: clientCnpjEntity.clientCnpj.retencao_iss,
      email_boleto_notas: clientCnpjEntity.clientCnpj.email_boleto_notas,

      // TESTEMUNHA / SEGUNDO CONTATO
      nome_segundo_contato: clientCnpjEntity.clientCnpj.nome_segundo_contato,
      estado_civil_segundo_contato:
        clientCnpjEntity.clientCnpj.estado_civil_segundo_contato,
      profissao_segundo_contato:
        clientCnpjEntity.clientCnpj.profissao_segundo_contato,
      rg_segundo_contato: clientCnpjEntity.clientCnpj.rg_segundo_contato,
      cpf_segundo_contato: clientCnpjEntity.clientCnpj.cpf_segundo_contato,
      email_segundo_contato: clientCnpjEntity.clientCnpj.email_segundo_contato,
      telefone_segundo_contato:
        clientCnpjEntity.clientCnpj.telefone_segundo_contato,
      nascimento_segundo_contato:
        clientCnpjEntity.clientCnpj.nascimento_segundo_contato,

      // TERCEIRO CONTATO
      nome_terceiro_contato: clientCnpjEntity.clientCnpj.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        clientCnpjEntity.clientCnpj.estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        clientCnpjEntity.clientCnpj.profissao_terceiro_contato,
      rg_terceiro_contato: clientCnpjEntity.clientCnpj.rg_terceiro_contato,
      cpf_terceiro_contato: clientCnpjEntity.clientCnpj.cpf_terceiro_contato,
      email_terceiro_contato:
        clientCnpjEntity.clientCnpj.email_terceiro_contato,
      telefone_terceiro_contato:
        clientCnpjEntity.clientCnpj.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        clientCnpjEntity.clientCnpj.nascimento_terceiro_contato,

      BasicClient: {
        connect: {
          id: basicClient.id,
        },
      },
    };
  }

  // MAP TO CONTRACT MODEL
  public mapToPrismaContract(
    contractEntity: ContractEntity,
    clientCnpj: { id: string },
  ): Prisma.ContractCreateInput {
    return {
      id: contractEntity.getId(),
      cnpj_cpf: contractEntity.contract.cnpj_cpf,
      tipo: contractEntity.contract.tipo,
      inicio_vigencia: contractEntity.contract.inicio_vigencia,
      termino_vigencia: contractEntity.contract.termino_vigencia,
      valor_total: contractEntity.contract.valor_total,
      data_vencimento: contractEntity.contract.data_vencimento,
      servicos_prestados: contractEntity.contract.servicos_prestados,
      observacoes_adicionais: contractEntity.contract.observacoes_adicionais,
      // RECORRENTE
      periodicidade: contractEntity.contract.periodicidade,
      // AVULSO
      numero_parcelas: contractEntity.contract.numero_parcelas,
      // CLIENT KEY
      ClientCnpj: {
        connect: {
          id: clientCnpj.id,
        },
      },
    };
  }
}
