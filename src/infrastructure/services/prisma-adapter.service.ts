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
      razao_social: clientEntity.registrationForm.razao_social,
      nome_fantasia: clientEntity.registrationForm.nome_fantasia,
      site: clientEntity.registrationForm.site,
      cnpj_cpf: clientEntity.registrationForm.cnpj_cpf,
      insc_estadual: clientEntity.registrationForm.insc_estadual,
      email: clientEntity.registrationForm.email,

      //   INFO ATENDIMENTO
      endereco_atendimento: clientEntity.registrationForm.endereco_atendimento,
      bairro: clientEntity.registrationForm.bairro,
      cep: clientEntity.registrationForm.cep,
      cidade: clientEntity.registrationForm.cidade,
      estado: clientEntity.registrationForm.estado,
      ddd: clientEntity.registrationForm.ddd,
      fax: clientEntity.registrationForm.fax,
      telefone: clientEntity.registrationForm.telefone,

      //   INFO FATURAMENTO
      endereco_faturamento: clientEntity.registrationForm.endereco_faturamento,
      bairro_faturamento: clientEntity.registrationForm.bairro_faturamento,
      cep_faturamento: clientEntity.registrationForm.cep_faturamento,
      cidade_faturamento: clientEntity.registrationForm.cidade_faturamento,
      estado_faturamento: clientEntity.registrationForm.estado_faturamento,
      ddd_faturamento: clientEntity.registrationForm.ddd_faturamento,
      fax_faturamento: clientEntity.registrationForm.fax_faturamento,
      telefone_faturamento: clientEntity.registrationForm.telefone_faturamento,

      //   RESPONSAVEL FINANCEIRO
      responsavel_financeiro:
        clientEntity.registrationForm.responsavel_financeiro,
      ddd_financeiro: clientEntity.registrationForm.ddd_financeiro,
      telefone_financeiro: clientEntity.registrationForm.telefone_financeiro,
      email_financeiro: clientEntity.registrationForm.email_financeiro,

      // REPRESENTANTE LEGAL
      nome_representante: clientEntity.registrationForm.nome_representante,
      estado_civil_representante:
        clientEntity.registrationForm.estado_civil_representante,
      profissao_representante:
        clientEntity.registrationForm.profissao_representante,
      rg_representante: clientEntity.registrationForm.rg_representante,
      cpf_representante: clientEntity.registrationForm.cpf_representante,
      email_representante: clientEntity.registrationForm.email_representante,
      telefone_representante:
        clientEntity.registrationForm.telefone_representante,
      nascimento_representante:
        clientEntity.registrationForm.nascimento_representante,

      // INFO BOLETOS E NOTAS FISCAIS
      email_boleto_notas: clientEntity.registrationForm.email_boleto_notas,

      // TESTEMUNHA / SEGUNDO CONTATO
      nome_segundo_contato: clientEntity.registrationForm.nome_segundo_contato,
      estado_civil_segundo_contato:
        clientEntity.registrationForm.estado_civil_segundo_contato,
      profissao_segundo_contato:
        clientEntity.registrationForm.profissao_segundo_contato,
      rg_segundo_contato: clientEntity.registrationForm.rg_segundo_contato,
      cpf_segundo_contato: clientEntity.registrationForm.cpf_segundo_contato,
      email_segundo_contato:
        clientEntity.registrationForm.email_segundo_contato,
      telefone_segundo_contato:
        clientEntity.registrationForm.telefone_segundo_contato,
      nascimento_segundo_contato:
        clientEntity.registrationForm.nascimento_segundo_contato,

      // TERCEIRO CONTATO
      nome_terceiro_contato:
        clientEntity.registrationForm.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        clientEntity.registrationForm.estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        clientEntity.registrationForm.profissao_terceiro_contato,
      rg_terceiro_contato: clientEntity.registrationForm.rg_terceiro_contato,
      cpf_terceiro_contato: clientEntity.registrationForm.cpf_terceiro_contato,
      email_terceiro_contato:
        clientEntity.registrationForm.email_terceiro_contato,
      telefone_terceiro_contato:
        clientEntity.registrationForm.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        clientEntity.registrationForm.nascimento_terceiro_contato,
    };
  }
}
