import { ContractRegistrationDto } from '../contracts/dtos/contract-registration.dto';
import { ContractRegistration } from 'src/domain/entity/contract.entity';
import { ClientContract } from 'src/domain/entity/client.entity';
import { ClientCnpjRegistrationDto } from '../clients/dtos/client-cnpj-registration.dto';

export class EntityFactoryService {
  public mapContractEntity(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): ContractRegistration {
    return {
      cliente_novo: contractRegistrationDto.cliente_novo,
      cnpj_cpf: contractRegistrationDto.cnpj_cpf,
      razao_social: contractRegistrationDto.razao_social,
      nome_fantasia: contractRegistrationDto.nome_fantasia,
      nome_contato: contractRegistrationDto.nome_contato,
      email_contato: contractRegistrationDto.email_contato,
      servicos_prestados: contractRegistrationDto.servicos_prestados,
      emissao_de_nota: contractRegistrationDto.emissao_de_nota,
      retencao_iss_emissao_nota_fiscal:
        contractRegistrationDto.retencao_iss_emissao_nota_fiscal,
      forma_recebimento: contractRegistrationDto.forma_recebimento,
      tipo: contractRegistrationDto.tipo,

      //   RECORRENTE
      inicio_vigencia: contractRegistrationDto.recorrente?.inicio_vigencia,
      termino_vigencia: contractRegistrationDto.recorrente?.termino_vigencia,
      periodicidade: contractRegistrationDto.recorrente?.periodicidade,
      valor_do_periodo: contractRegistrationDto.recorrente?.valor_do_periodo,
      observacoes_adicionais:
        contractRegistrationDto.recorrente?.observacoes_adicionais,

      //   AVULSO
      valor_total_servicos:
        contractRegistrationDto.avulso?.valor_total_servicos,
      numero_parcelas: contractRegistrationDto.avulso?.numero_parcelas,
      data_vencimento: contractRegistrationDto.avulso?.data_vencimento,
      observacoes_adicionais_nota_fiscal:
        contractRegistrationDto.avulso?.observacoes_adicionais_nota_fiscal,
    };
  }

  public mapClientToEntity(
    cnpjRegistration: (typeof ClientCnpjRegistrationDto)['_input'],
  ): ClientContract {
    return {
      razao_social: cnpjRegistration.basicInfo.razao_social,
      nome_fantasia: cnpjRegistration.basicInfo.nome_fantasia,
      site: cnpjRegistration.basicInfo.site,
      cnpj_cpf: cnpjRegistration.basicInfo.cnpj_cpf,
      insc_estadual: cnpjRegistration.basicInfo.insc_estadual,
      email: cnpjRegistration.basicInfo.email,

      //   INFO ATENDIMENTO
      endereco_atendimento: cnpjRegistration.contactInfo.endereco_atendimento,
      bairro: cnpjRegistration.contactInfo.bairro,
      cep: cnpjRegistration.contactInfo.cep,
      cidade: cnpjRegistration.contactInfo.cidade,
      estado: cnpjRegistration.contactInfo.estado,
      ddd: cnpjRegistration.contactInfo.ddd,
      fax: cnpjRegistration.contactInfo.fax,
      telefone: cnpjRegistration.contactInfo.telefone,

      //   INFO FATURAMENTO
      endereco_faturamento: cnpjRegistration.billingInfo.endereco_faturamento,
      bairro_faturamento: cnpjRegistration.billingInfo.bairro_faturamento,
      cep_faturamento: cnpjRegistration.billingInfo.cep_faturamento,
      cidade_faturamento: cnpjRegistration.billingInfo.cidade_faturamento,
      estado_faturamento: cnpjRegistration.billingInfo.estado_faturamento,
      ddd_faturamento: cnpjRegistration.billingInfo.ddd_faturamento,
      fax_faturamento: cnpjRegistration.billingInfo.fax_faturamento,
      telefone_faturamento: cnpjRegistration.billingInfo.telefone_faturamento,

      //   RESPONSAVEL FINANCEIRO
      responsavel_financeiro:
        cnpjRegistration.finacialInfo.responsavel_financeiro,
      ddd_financeiro: cnpjRegistration.finacialInfo.ddd_financeiro,
      telefone_financeiro: cnpjRegistration.finacialInfo.telefone_financeiro,
      email_financeiro: cnpjRegistration.finacialInfo.email_financeiro,

      // REPRESENTANTE LEGAL
      nome_representante: cnpjRegistration.legalInfo.nome_representante,
      estado_civil_representante:
        cnpjRegistration.legalInfo.estado_civil_representante,
      profissao_representante:
        cnpjRegistration.legalInfo.profissao_representante,
      rg_representante: cnpjRegistration.legalInfo.rg_representante,
      cpf_representante: cnpjRegistration.legalInfo.cpf_representante,
      email_representante: cnpjRegistration.legalInfo.email_representante,
      telefone_representante: cnpjRegistration.legalInfo.telefone_representante,
      nascimento_representante:
        cnpjRegistration.legalInfo.nascimento_representante,

      // INFO BOLETOS E NOTAS FISCAIS
      email_boleto_notas: cnpjRegistration.billingInfo.email_boleto_notas,

      // TESTEMUNHA / SEGUNDO CONTATO
      nome_segundo_contato:
        cnpjRegistration.AdditionalContactsSchema.nome_segundo_contato,
      estado_civil_segundo_contato:
        cnpjRegistration.AdditionalContactsSchema.estado_civil_segundo_contato,
      profissao_segundo_contato:
        cnpjRegistration.AdditionalContactsSchema.profissao_segundo_contato,
      rg_segundo_contato:
        cnpjRegistration.AdditionalContactsSchema.rg_segundo_contato,
      cpf_segundo_contato:
        cnpjRegistration.AdditionalContactsSchema.cpf_segundo_contato,
      email_segundo_contato:
        cnpjRegistration.AdditionalContactsSchema.email_segundo_contato,
      telefone_segundo_contato:
        cnpjRegistration.AdditionalContactsSchema.telefone_segundo_contato,
      nascimento_segundo_contato:
        cnpjRegistration.AdditionalContactsSchema.nascimento_segundo_contato,

      // TERCEIRO CONTATO
      nome_terceiro_contato:
        cnpjRegistration.AdditionalContactsSchema.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        cnpjRegistration.AdditionalContactsSchema.estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        cnpjRegistration.AdditionalContactsSchema.profissao_terceiro_contato,
      rg_terceiro_contato:
        cnpjRegistration.AdditionalContactsSchema.rg_terceiro_contato,
      cpf_terceiro_contato:
        cnpjRegistration.AdditionalContactsSchema.cpf_terceiro_contato,
      email_terceiro_contato:
        cnpjRegistration.AdditionalContactsSchema.email_terceiro_contato,
      telefone_terceiro_contato:
        cnpjRegistration.AdditionalContactsSchema.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        cnpjRegistration.AdditionalContactsSchema.nascimento_terceiro_contato,
    };
  }
}
