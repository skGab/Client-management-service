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
      razao_social: clientEntity.client.razao_social,
      nome_fantasia: clientEntity.client.nome_fantasia,
      site: clientEntity.client.site,
      cnpj_cpf: clientEntity.client.cnpj_cpf,
      insc_estadual: clientEntity.client.insc_estadual,
      email: clientEntity.client.email,

      //   INFO ATENDIMENTO
      endereco_atendimento: clientEntity.client.endereco_atendimento,
      bairro: clientEntity.client.bairro,
      cep: clientEntity.client.cep,
      cidade: clientEntity.client.cidade,
      estado: clientEntity.client.estado,
      ddd: clientEntity.client.ddd,
      fax: clientEntity.client.fax,
      telefone: clientEntity.client.telefone,

      //   INFO FATURAMENTO
      endereco_faturamento: clientEntity.client.endereco_faturamento,
      bairro_faturamento: clientEntity.client.bairro_faturamento,
      cep_faturamento: clientEntity.client.cep_faturamento,
      cidade_faturamento: clientEntity.client.cidade_faturamento,
      estado_faturamento: clientEntity.client.estado_faturamento,
      ddd_faturamento: clientEntity.client.ddd_faturamento,
      fax_faturamento: clientEntity.client.fax_faturamento,
      telefone_faturamento: clientEntity.client.telefone_faturamento,

      //   RESPONSAVEL FINANCEIRO
      responsavel_financeiro:
        clientEntity.client.responsavel_financeiro,
      ddd_financeiro: clientEntity.client.ddd_financeiro,
      telefone_financeiro: clientEntity.client.telefone_financeiro,
      email_financeiro: clientEntity.client.email_financeiro,

      // REPRESENTANTE LEGAL
      nome_representante: clientEntity.client.nome_representante,
      estado_civil_representante:
        clientEntity.client.estado_civil_representante,
      profissao_representante:
        clientEntity.client.profissao_representante,
      rg_representante: clientEntity.client.rg_representante,
      cpf_representante: clientEntity.client.cpf_representante,
      email_representante: clientEntity.client.email_representante,
      telefone_representante:
        clientEntity.client.telefone_representante,
      nascimento_representante:
        clientEntity.client.nascimento_representante,

      // INFO BOLETOS E NOTAS FISCAIS
      email_boleto_notas: clientEntity.client.email_boleto_notas,

      // TESTEMUNHA / SEGUNDO CONTATO
      nome_segundo_contato: clientEntity.client.nome_segundo_contato,
      estado_civil_segundo_contato:
        clientEntity.client.estado_civil_segundo_contato,
      profissao_segundo_contato:
        clientEntity.client.profissao_segundo_contato,
      rg_segundo_contato: clientEntity.client.rg_segundo_contato,
      cpf_segundo_contato: clientEntity.client.cpf_segundo_contato,
      email_segundo_contato:
        clientEntity.client.email_segundo_contato,
      telefone_segundo_contato:
        clientEntity.client.telefone_segundo_contato,
      nascimento_segundo_contato:
        clientEntity.client.nascimento_segundo_contato,

      // TERCEIRO CONTATO
      nome_terceiro_contato:
        clientEntity.client.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        clientEntity.client.estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        clientEntity.client.profissao_terceiro_contato,
      rg_terceiro_contato: clientEntity.client.rg_terceiro_contato,
      cpf_terceiro_contato: clientEntity.client.cpf_terceiro_contato,
      email_terceiro_contato:
        clientEntity.client.email_terceiro_contato,
      telefone_terceiro_contato:
        clientEntity.client.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        clientEntity.client.nascimento_terceiro_contato,
    };
  }

  public mapToPrismaContract(
    contractEntity: ContractEntity,
    client: { id: string },
  ): Prisma.ContractCreateInput {
    return {
      id: contractEntity.getId(),
      cliente_novo: contractEntity.contract.cliente_novo,
      cnpj_cpf: contractEntity.contract.cnpj_cpf,
      razao_social: contractEntity.contract.razao_social,
      nome_fantasia: contractEntity.contract.nome_fantasia,
      nome_contato: contractEntity.contract.nome_contato,
      email_contato: contractEntity.contract.email_contato,
      servicos_prestados:
        contractEntity.contract.servicos_prestados,
      emissao_de_nota: contractEntity.contract.emissao_de_nota,
      retencao_iss_emissao_nota_fiscal:
        contractEntity.contract.retencao_iss_emissao_nota_fiscal,
      forma_recebimento: contractEntity.contract.forma_recebimento,
      tipo: contractEntity.contract.tipo,

      // RECORRENTE
      inicio_vigencia: contractEntity.contract.inicio_vigencia,
      termino_vigencia: contractEntity.contract.termino_vigencia,
      periodicidade: contractEntity.contract.periodicidade,
      valor_do_periodo: contractEntity.contract.valor_do_periodo,
      observacoes_adicionais:
        contractEntity.contract.observacoes_adicionais,

      // AVULSO
      valor_total_servicos:
        contractEntity.contract.valor_total_servicos,
      numero_parcelas: contractEntity.contract.numero_parcelas,
      data_vencimento: contractEntity.contract.data_vencimento,
      observacoes_adicionais_nota_fiscal:
        contractEntity.contract.observacoes_adicionais_nota_fiscal,

      // CLIENT KEY
      Client: {
        connect: {
          id: client.id,
        },
      },
    };
  }
}
