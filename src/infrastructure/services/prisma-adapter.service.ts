import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ClientEntity } from 'src/domain/entity/client.entity';

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
}
