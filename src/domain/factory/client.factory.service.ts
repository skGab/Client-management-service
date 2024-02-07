import { ClientCnpj, Contract } from '@prisma/client';
import { ClientCnpjEntity } from '../entity/client-cnpj.entity';
import { ContractEntity } from '../entity/contract.entity';

export class ClientFactoryService {
  public toClientCnpjEntity(
    clientCnpjs: (ClientCnpj & { contracts: Contract[] })[],
  ): ClientCnpjEntity[] {
    return clientCnpjs.map(
      (clientCnpj) =>
        new ClientCnpjEntity(
          {
            id: clientCnpj.id,
            razao_social: clientCnpj.razao_social,
            nome_cliente: clientCnpj.nome_cliente,
            site: clientCnpj.site,
            cnpj_cpf: clientCnpj.cnpj_cpf,
            insc_estadual: clientCnpj.insc_estadual,
            email: clientCnpj.email,

            //   INFO ATENDIMENTO
            endereco_atendimento: clientCnpj.endereco_atendimento,
            bairro: clientCnpj.bairro,
            cep: clientCnpj.cep,
            cidade: clientCnpj.cidade,
            estado: clientCnpj.estado,
            ddd: clientCnpj.ddd,
            fax: clientCnpj.fax,
            telefone: clientCnpj.telefone,

            //   INFO FATURAMENTO
            endereco_faturamento: clientCnpj.endereco_faturamento,
            bairro_faturamento: clientCnpj.bairro_faturamento,
            cep_faturamento: clientCnpj.cep_faturamento,
            cidade_faturamento: clientCnpj.cidade_faturamento,
            estado_faturamento: clientCnpj.estado_faturamento,
            ddd_faturamento: clientCnpj.ddd_faturamento,
            fax_faturamento: clientCnpj.fax_faturamento,
            telefone_faturamento: clientCnpj.telefone_faturamento,

            //   RESPONSAVEL FINANCEIRO
            responsavel_financeiro: clientCnpj.responsavel_financeiro,
            ddd_financeiro: clientCnpj.ddd_financeiro,
            telefone_financeiro: clientCnpj.telefone_financeiro,
            email_financeiro: clientCnpj.email_financeiro,

            // REPRESENTANTE LEGAL (Obrigatorio)
            nome_representante: clientCnpj.nome_representante,
            estado_civil_representante: clientCnpj.estado_civil_representante,
            profissao_representante: clientCnpj.profissao_representante,
            rg_representante: clientCnpj.rg_representante,
            cpf_representante: clientCnpj.cpf_representante,
            email_representante: clientCnpj.email_representante,
            telefone_representante: clientCnpj.telefone_representante,
            nascimento_representante: clientCnpj.nascimento_representante,

            // INFO BOLETOS E NOTAS FISCAIS
            retencao_iss: clientCnpj.retencao_iss,
            emissao_nota: clientCnpj.emissao_notas,
            forma_recebimento: clientCnpj.forma_recebimento,
            email_boleto_notas: clientCnpj.email_boleto_notas,

            // TESTEMUNHA / SEGUNDO CONTATO
            nome_segundo_contato: clientCnpj.nome_segundo_contato,
            estado_civil_segundo_contato:
              clientCnpj.estado_civil_segundo_contato,
            profissao_segundo_contato: clientCnpj.profissao_segundo_contato,
            rg_segundo_contato: clientCnpj.rg_segundo_contato,
            cpf_segundo_contato: clientCnpj.cpf_segundo_contato,
            email_segundo_contato: clientCnpj.email_segundo_contato,
            telefone_segundo_contato: clientCnpj.telefone_segundo_contato,
            nascimento_segundo_contato: clientCnpj.nascimento_segundo_contato,

            //   TERCEIRO CONTATO
            nome_terceiro_contato: clientCnpj.nome_terceiro_contato,
            estado_civil_terceiro_contato:
              clientCnpj.estado_civil_terceiro_contato,
            profissao_terceiro_contato: clientCnpj.responsavel_financeiro,
            rg_terceiro_contato: clientCnpj.rg_terceiro_contato,
            cpf_terceiro_contato: clientCnpj.cpf_terceiro_contato,
            email_terceiro_contato: clientCnpj.email_terceiro_contato,
            telefone_terceiro_contato: clientCnpj.telefone_terceiro_contato,
            nascimento_terceiro_contato: clientCnpj.nascimento_terceiro_contato,
          },
          this.toContractEntity(clientCnpjs),
        ),
    );
  }

  private toContractEntity(
    clientCnpjs: (ClientCnpj & { contracts: Contract[] })[],
  ): ContractEntity[] {
    const contracts = clientCnpjs.flatMap(({ contracts }) => contracts);

    if (contracts.length == 0) return null;

    return contracts.map(
      (contract) =>
        new ContractEntity({
          id: contract.id,
          cnpj_cpf: contract.cnpj_cpf,
          servicos_prestados: contract.servicos_prestados as string[],
          valor_total: contract.valor_total,
          inicio_vigencia: contract.inicio_vigencia,
          termino_vigencia: contract.termino_vigencia,
          tipo: contract.tipo,
          data_vencimento: contract.data_vencimento,
          observacoes_adicionais: contract.observacoes_adicionais,
          //   RECORRENTE
          periodicidade: contract.periodicidade,
          //   AVULSO
          numero_parcelas: contract.numero_parcelas,
        }),
    );
  }
}
