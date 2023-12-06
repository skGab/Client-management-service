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
      razao_social: clientEntity.formRegistration.razao_social,
      nome_fantasia: clientEntity.formRegistration.nome_fantasia,
      site: clientEntity.formRegistration.site,
      cnpj_cpf: clientEntity.formRegistration.cnpj_cpf,
      insc_estadual: clientEntity.formRegistration.insc_estadual,
      email: clientEntity.formRegistration.email,

      //   INFO ATENDIMENTO
      endereco_atendimento: clientEntity.formRegistration.endereco_atendimento,
      bairro: clientEntity.formRegistration.bairro,
      cep: clientEntity.formRegistration.cep,
      cidade: clientEntity.formRegistration.cidade,
      estado: clientEntity.formRegistration.estado,
      ddd: clientEntity.formRegistration.ddd,
      fax: clientEntity.formRegistration.fax,
      telefone: clientEntity.formRegistration.telefone,

      //   INFO FATURAMENTO
      endereco_faturamento: clientEntity.formRegistration.endereco_faturamento,
      bairro_faturamento: clientEntity.formRegistration.bairro_faturamento,
      cep_faturamento: clientEntity.formRegistration.cep_faturamento,
      cidade_faturamento: clientEntity.formRegistration.cidade_faturamento,
      estado_faturamento: clientEntity.formRegistration.estado_faturamento,
      ddd_faturamento: clientEntity.formRegistration.ddd_faturamento,
      fax_faturamento: clientEntity.formRegistration.fax_faturamento,
      telefone_faturamento: clientEntity.formRegistration.telefone_faturamento,

      //   RESPONSAVEL FINANCEIRO
      responsavel_financeiro:
        clientEntity.formRegistration.responsavel_financeiro,
      ddd_financeiro: clientEntity.formRegistration.ddd_financeiro,
      telefone_financeiro: clientEntity.formRegistration.telefone_financeiro,
      email_financeiro: clientEntity.formRegistration.email_financeiro,

      // REPRESENTANTE LEGAL
      nome_representante: clientEntity.formRegistration.nome_representante,
      estado_civil_representante:
        clientEntity.formRegistration.estado_civil_representante,
      profissao_representante:
        clientEntity.formRegistration.profissao_representante,
      rg_representante: clientEntity.formRegistration.rg_representante,
      cpf_representante: clientEntity.formRegistration.cpf_representante,
      email_representante: clientEntity.formRegistration.email_representante,
      telefone_representante:
        clientEntity.formRegistration.telefone_representante,
      nascimento_representante:
        clientEntity.formRegistration.nascimento_representante,

      // INFO BOLETOS E NOTAS FISCAIS
      email_boleto_notas: clientEntity.formRegistration.email_boleto_notas,

      // TESTEMUNHA / SEGUNDO CONTATO
      nome_segundo_contato: clientEntity.formRegistration.nome_segundo_contato,
      estado_civil_segundo_contato:
        clientEntity.formRegistration.estado_civil_segundo_contato,
      profissao_segundo_contato:
        clientEntity.formRegistration.profissao_segundo_contato,
      rg_segundo_contato: clientEntity.formRegistration.rg_segundo_contato,
      cpf_segundo_contato: clientEntity.formRegistration.cpf_segundo_contato,
      email_segundo_contato:
        clientEntity.formRegistration.email_segundo_contato,
      telefone_segundo_contato:
        clientEntity.formRegistration.telefone_segundo_contato,
      nascimento_segundo_contato:
        clientEntity.formRegistration.nascimento_segundo_contato,

      // TERCEIRO CONTATO
      nome_terceiro_contato:
        clientEntity.formRegistration.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        clientEntity.formRegistration.estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        clientEntity.formRegistration.profissao_terceiro_contato,
      rg_terceiro_contato: clientEntity.formRegistration.rg_terceiro_contato,
      cpf_terceiro_contato: clientEntity.formRegistration.cpf_terceiro_contato,
      email_terceiro_contato:
        clientEntity.formRegistration.email_terceiro_contato,
      telefone_terceiro_contato:
        clientEntity.formRegistration.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        clientEntity.formRegistration.nascimento_terceiro_contato,
    };
  }

  public mapToPrismaContract(
    contractEntity: ContractEntity,
  ): Prisma.ContractCreateInput {
    return {
      id: contractEntity.getId(),
      cliente_novo: contractEntity.contractRegistration.cliente_novo,
      cnpj_cliente: contractEntity.contractRegistration.cnpj_cliente,
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
    };
  }
}
