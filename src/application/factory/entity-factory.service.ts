import { ContractRegistrationDto } from '../contracts/dtos/contract-registration.dto';
import { Contract } from 'src/domain/entity/contract.entity';
import { Client } from 'src/domain/entity/client.entity';
import { ClientRegistrationDto } from '../clients/dtos/client-registration.dto';

export class EntityFactoryService {
  public mapContractEntity(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): Contract {
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

  public mapClientEntity(
    registrationFormDto: (typeof ClientRegistrationDto)['_input'],
  ): Client {
    return {
      razao_social: registrationFormDto.basicInfo.razao_social,
      nome_fantasia: registrationFormDto.basicInfo.nome_fantasia,
      site: registrationFormDto.basicInfo.site,
      cnpj_cpf: registrationFormDto.basicInfo.cnpj_cpf,
      insc_estadual: registrationFormDto.basicInfo.insc_estadual,
      email: registrationFormDto.basicInfo.email,

      //   INFO ATENDIMENTO
      endereco_atendimento:
        registrationFormDto.contactInfo.endereco_atendimento,
      bairro: registrationFormDto.contactInfo.bairro,
      cep: registrationFormDto.contactInfo.cep,
      cidade: registrationFormDto.contactInfo.cidade,
      estado: registrationFormDto.contactInfo.estado,
      ddd: registrationFormDto.contactInfo.ddd,
      fax: registrationFormDto.contactInfo.fax,
      telefone: registrationFormDto.contactInfo.telefone,

      //   INFO FATURAMENTO
      endereco_faturamento:
        registrationFormDto.billingInfo.endereco_faturamento,
      bairro_faturamento: registrationFormDto.billingInfo.bairro_faturamento,
      cep_faturamento: registrationFormDto.billingInfo.cep_faturamento,
      cidade_faturamento: registrationFormDto.billingInfo.cidade_faturamento,
      estado_faturamento: registrationFormDto.billingInfo.estado_faturamento,
      ddd_faturamento: registrationFormDto.billingInfo.ddd_faturamento,
      fax_faturamento: registrationFormDto.billingInfo.fax_faturamento,
      telefone_faturamento:
        registrationFormDto.billingInfo.telefone_faturamento,

      //   RESPONSAVEL FINANCEIRO
      responsavel_financeiro:
        registrationFormDto.finacialInfo.responsavel_financeiro,
      ddd_financeiro: registrationFormDto.finacialInfo.ddd_financeiro,
      telefone_financeiro: registrationFormDto.finacialInfo.telefone_financeiro,
      email_financeiro: registrationFormDto.finacialInfo.email_financeiro,

      // REPRESENTANTE LEGAL
      nome_representante: registrationFormDto.legalInfo.nome_representante,
      estado_civil_representante:
        registrationFormDto.legalInfo.estado_civil_representante,
      profissao_representante:
        registrationFormDto.legalInfo.profissao_representante,
      rg_representante: registrationFormDto.legalInfo.rg_representante,
      cpf_representante: registrationFormDto.legalInfo.cpf_representante,
      email_representante: registrationFormDto.legalInfo.email_representante,
      telefone_representante:
        registrationFormDto.legalInfo.telefone_representante,
      nascimento_representante:
        registrationFormDto.legalInfo.nascimento_representante,

      // INFO BOLETOS E NOTAS FISCAIS
      email_boleto_notas: registrationFormDto.billingInfo.email_boleto_notas,

      // TESTEMUNHA / SEGUNDO CONTATO
      nome_segundo_contato:
        registrationFormDto.AdditionalContactsSchema.nome_segundo_contato,
      estado_civil_segundo_contato:
        registrationFormDto.AdditionalContactsSchema
          .estado_civil_segundo_contato,
      profissao_segundo_contato:
        registrationFormDto.AdditionalContactsSchema.profissao_segundo_contato,
      rg_segundo_contato:
        registrationFormDto.AdditionalContactsSchema.rg_segundo_contato,
      cpf_segundo_contato:
        registrationFormDto.AdditionalContactsSchema.cpf_segundo_contato,
      email_segundo_contato:
        registrationFormDto.AdditionalContactsSchema.email_segundo_contato,
      telefone_segundo_contato:
        registrationFormDto.AdditionalContactsSchema.telefone_segundo_contato,
      nascimento_segundo_contato:
        registrationFormDto.AdditionalContactsSchema.nascimento_segundo_contato,

      // TERCEIRO CONTATO
      nome_terceiro_contato:
        registrationFormDto.AdditionalContactsSchema.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        registrationFormDto.AdditionalContactsSchema
          .estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        registrationFormDto.AdditionalContactsSchema.profissao_terceiro_contato,
      rg_terceiro_contato:
        registrationFormDto.AdditionalContactsSchema.rg_terceiro_contato,
      cpf_terceiro_contato:
        registrationFormDto.AdditionalContactsSchema.cpf_terceiro_contato,
      email_terceiro_contato:
        registrationFormDto.AdditionalContactsSchema.email_terceiro_contato,
      telefone_terceiro_contato:
        registrationFormDto.AdditionalContactsSchema.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        registrationFormDto.AdditionalContactsSchema
          .nascimento_terceiro_contato,
    };
  }
}
