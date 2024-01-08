import { ContractEntity } from './../../domain/entity/contract.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ClientEntity } from 'src/domain/entity/client.entity';

export interface EntityMapper<T> {
  mapToPrismaClient(entity: T): Prisma.ClientCreateInput;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  public mapToPrismaClient(
    clientEntity: ClientEntity,
  ): Prisma.ClientCreateInput {
    return {
      id: clientEntity.getId(),
      razao_social: clientEntity.clientContract.razao_social,
      nome_fantasia: clientEntity.clientContract.nome_fantasia,
      site: clientEntity.clientContract.site,
      cnpj_cpf: clientEntity.clientContract.cnpj_cpf,
      insc_estadual: clientEntity.clientContract.insc_estadual,
      email: clientEntity.clientContract.email,

      //   INFO ATENDIMENTO
      endereco_atendimento: clientEntity.clientContract.endereco_atendimento,
      bairro: clientEntity.clientContract.bairro,
      cep: clientEntity.clientContract.cep,
      cidade: clientEntity.clientContract.cidade,
      estado: clientEntity.clientContract.estado,
      ddd: clientEntity.clientContract.ddd,
      fax: clientEntity.clientContract.fax,
      telefone: clientEntity.clientContract.telefone,

      //   INFO FATURAMENTO
      endereco_faturamento: clientEntity.clientContract.endereco_faturamento,
      bairro_faturamento: clientEntity.clientContract.bairro_faturamento,
      cep_faturamento: clientEntity.clientContract.cep_faturamento,
      cidade_faturamento: clientEntity.clientContract.cidade_faturamento,
      estado_faturamento: clientEntity.clientContract.estado_faturamento,
      ddd_faturamento: clientEntity.clientContract.ddd_faturamento,
      fax_faturamento: clientEntity.clientContract.fax_faturamento,
      telefone_faturamento: clientEntity.clientContract.telefone_faturamento,

      //   RESPONSAVEL FINANCEIRO
      responsavel_financeiro:
        clientEntity.clientContract.responsavel_financeiro,
      ddd_financeiro: clientEntity.clientContract.ddd_financeiro,
      telefone_financeiro: clientEntity.clientContract.telefone_financeiro,
      email_financeiro: clientEntity.clientContract.email_financeiro,

      // REPRESENTANTE LEGAL
      nome_representante: clientEntity.clientContract.nome_representante,
      estado_civil_representante:
        clientEntity.clientContract.estado_civil_representante,
      profissao_representante:
        clientEntity.clientContract.profissao_representante,
      rg_representante: clientEntity.clientContract.rg_representante,
      cpf_representante: clientEntity.clientContract.cpf_representante,
      email_representante: clientEntity.clientContract.email_representante,
      telefone_representante:
        clientEntity.clientContract.telefone_representante,
      nascimento_representante:
        clientEntity.clientContract.nascimento_representante,

      // INFO BOLETOS E NOTAS FISCAIS
      email_boleto_notas: clientEntity.clientContract.email_boleto_notas,

      // TESTEMUNHA / SEGUNDO CONTATO
      nome_segundo_contato: clientEntity.clientContract.nome_segundo_contato,
      estado_civil_segundo_contato:
        clientEntity.clientContract.estado_civil_segundo_contato,
      profissao_segundo_contato:
        clientEntity.clientContract.profissao_segundo_contato,
      rg_segundo_contato: clientEntity.clientContract.rg_segundo_contato,
      cpf_segundo_contato: clientEntity.clientContract.cpf_segundo_contato,
      email_segundo_contato:
        clientEntity.clientContract.email_segundo_contato,
      telefone_segundo_contato:
        clientEntity.clientContract.telefone_segundo_contato,
      nascimento_segundo_contato:
        clientEntity.clientContract.nascimento_segundo_contato,

      // TERCEIRO CONTATO
      nome_terceiro_contato:
        clientEntity.clientContract.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        clientEntity.clientContract.estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        clientEntity.clientContract.profissao_terceiro_contato,
      rg_terceiro_contato: clientEntity.clientContract.rg_terceiro_contato,
      cpf_terceiro_contato: clientEntity.clientContract.cpf_terceiro_contato,
      email_terceiro_contato:
        clientEntity.clientContract.email_terceiro_contato,
      telefone_terceiro_contato:
        clientEntity.clientContract.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        clientEntity.clientContract.nascimento_terceiro_contato,
    };
  }

  public mapToPrismaContract(
    contractEntity: ContractEntity,
    client: { id: string },
  ): Prisma.ContractCreateInput {
    return {
      id: contractEntity.getId(),
      cliente_novo: contractEntity.contractRegistration.cliente_novo,
      cnpj_cpf: contractEntity.contractRegistration.cnpj_cpf,
      razao_social: contractEntity.contractRegistration.razao_social,
      nome_fantasia: contractEntity.contractRegistration.nome_fantasia,
      nome_contato: contractEntity.contractRegistration.nome_contato,
      email_contato: contractEntity.contractRegistration.email_contato,
      servicos_prestados:
        contractEntity.contractRegistration.servicos_prestados,
      emissao_de_nota: contractEntity.contractRegistration.emissao_de_nota,
      retencao_iss_emissao_nota_fiscal:
        contractEntity.contractRegistration.retencao_iss_emissao_nota_fiscal,
      forma_recebimento: contractEntity.contractRegistration.forma_recebimento,
      tipo: contractEntity.contractRegistration.tipo,

      // RECORRENTE
      inicio_vigencia: contractEntity.contractRegistration.inicio_vigencia,
      termino_vigencia: contractEntity.contractRegistration.termino_vigencia,
      periodicidade: contractEntity.contractRegistration.periodicidade,
      valor_do_periodo: contractEntity.contractRegistration.valor_do_periodo,
      observacoes_adicionais:
        contractEntity.contractRegistration.observacoes_adicionais,

      // AVULSO
      valor_total_servicos:
        contractEntity.contractRegistration.valor_total_servicos,
      numero_parcelas: contractEntity.contractRegistration.numero_parcelas,
      data_vencimento: contractEntity.contractRegistration.data_vencimento,
      observacoes_adicionais_nota_fiscal:
        contractEntity.contractRegistration.observacoes_adicionais_nota_fiscal,

      // CLIENT KEY
      Client: {
        connect: {
          id: client.id,
        },
      },
    };
  }
}
