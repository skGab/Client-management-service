import { ContractRegistrationDto } from '../contracts/dtos/contract-registration.dto';
import { ClientCnpjRegistrationDto } from '../clients/dtos/client-cnpj-registration.dto';
import { Contract } from 'src/domain/entity/contract.entity';
import { BasicClient } from 'src/domain/entity/client.entity';
import { BasicClientDto } from '../clients/dtos/basic-client.dto';
import { ClientCnpj } from 'src/domain/entity/client-cnpj.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DtoToEntityFactory {
  // MAP CONTRACT TO CONTRACT ENTITY
  public mapContractToEntity(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): Contract {
    return {
      cnpj_cpf: contractRegistrationDto.cnpj_cpf,
      tipo: contractRegistrationDto.tipo,
      inicio_vigencia: contractRegistrationDto.inicio_vigencia,
      termino_vigencia: contractRegistrationDto.termino_vigencia,
      valor_total: contractRegistrationDto.valor_total,
      data_vencimento: contractRegistrationDto.data_vencimento,
      servicos_prestados: contractRegistrationDto.servicos_prestados,
      observacoes_adicionais: contractRegistrationDto.observacoes_adicionais,

      //   RECORRENTE
      periodicidade: contractRegistrationDto?.periodicidade,

      //   AVULSO
      numero_parcelas: contractRegistrationDto?.numero_parcelas,
    };
  }

  // MAP CLIENT TO CLIENT ENTITY
  public mapBasicClientToEntity(
    basicClientDto: (typeof BasicClientDto)['_input'],
  ): BasicClient {
    return {
      nome_cliente: basicClientDto.nome_cliente,
      site: basicClientDto.site,
      email: basicClientDto.email,
      telefone: basicClientDto.telefone,
    };
  }

  public mapClientCnpjToEntity(
    clientCnpjDto: (typeof ClientCnpjRegistrationDto)['_input'],
  ): ClientCnpj {
    return {
      // Mapping for BasicInfo
      razao_social: clientCnpjDto.basicInfo.razao_social,
      nome_cliente: clientCnpjDto.basicInfo.nome_cliente,
      site: clientCnpjDto.basicInfo.site,
      cnpj_cpf: clientCnpjDto.basicInfo.cnpj_cpf,
      insc_estadual: clientCnpjDto.basicInfo.insc_estadual,
      email: clientCnpjDto.basicInfo.email,

      // Mapping for ContactInfo
      endereco_atendimento: clientCnpjDto.contactInfo.endereco_atendimento,
      bairro: clientCnpjDto.contactInfo.bairro,
      cep: clientCnpjDto.contactInfo.cep,
      cidade: clientCnpjDto.contactInfo.cidade,
      estado: clientCnpjDto.contactInfo.estado,
      ddd: clientCnpjDto.contactInfo.ddd,
      fax: clientCnpjDto.contactInfo.fax,
      telefone: clientCnpjDto.contactInfo.telefone,

      // Mapping for BillingInfo
      endereco_faturamento: clientCnpjDto.billingInfo.endereco_faturamento,
      bairro_faturamento: clientCnpjDto.billingInfo.bairro_faturamento,
      cep_faturamento: clientCnpjDto.billingInfo.cep_faturamento,
      cidade_faturamento: clientCnpjDto.billingInfo.cidade_faturamento,
      estado_faturamento: clientCnpjDto.billingInfo.estado_faturamento,
      ddd_faturamento: clientCnpjDto.billingInfo.ddd_faturamento,
      fax_faturamento: clientCnpjDto.billingInfo.fax_faturamento,
      telefone_faturamento: clientCnpjDto.billingInfo.telefone_faturamento,
      email_boleto_notas: clientCnpjDto.billingInfo.email_boleto_notas,
      emissao_nota: clientCnpjDto.billingInfo.email_boleto_notas,
      retencao_iss: clientCnpjDto.billingInfo.retencao_iss,
      forma_recebimento: clientCnpjDto.billingInfo.forma_recebimento,

      // Mapping for FinancialResponsible
      responsavel_financeiro: clientCnpjDto.finacialInfo.responsavel_financeiro,
      ddd_financeiro: clientCnpjDto.finacialInfo.ddd_financeiro,
      telefone_financeiro: clientCnpjDto.finacialInfo.telefone_financeiro,
      email_financeiro: clientCnpjDto.finacialInfo.email_financeiro,

      // Mapping for LegalRepresentative
      nome_representante: clientCnpjDto.legalInfo.nome_representante,
      estado_civil_representante:
        clientCnpjDto.legalInfo.estado_civil_representante,
      profissao_representante: clientCnpjDto.legalInfo.profissao_representante,
      rg_representante: clientCnpjDto.legalInfo.rg_representante,
      cpf_representante: clientCnpjDto.legalInfo.cpf_representante,
      email_representante: clientCnpjDto.legalInfo.email_representante,
      telefone_representante: clientCnpjDto.legalInfo.telefone_representante,
      nascimento_representante:
        clientCnpjDto.legalInfo.nascimento_representante,

      // Mapping for AdditionalContacts
      nome_segundo_contato:
        clientCnpjDto.AdditionalContactsSchema.nome_segundo_contato,
      estado_civil_segundo_contato:
        clientCnpjDto.AdditionalContactsSchema.estado_civil_segundo_contato,
      profissao_segundo_contato:
        clientCnpjDto.AdditionalContactsSchema.profissao_segundo_contato,
      rg_segundo_contato:
        clientCnpjDto.AdditionalContactsSchema.rg_segundo_contato,
      cpf_segundo_contato:
        clientCnpjDto.AdditionalContactsSchema.cpf_segundo_contato,
      email_segundo_contato:
        clientCnpjDto.AdditionalContactsSchema.email_segundo_contato,
      telefone_segundo_contato:
        clientCnpjDto.AdditionalContactsSchema.telefone_segundo_contato,
      nascimento_segundo_contato:
        clientCnpjDto.AdditionalContactsSchema.nascimento_segundo_contato,
      nome_terceiro_contato:
        clientCnpjDto.AdditionalContactsSchema.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        clientCnpjDto.AdditionalContactsSchema.estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        clientCnpjDto.AdditionalContactsSchema.profissao_terceiro_contato,
      rg_terceiro_contato:
        clientCnpjDto.AdditionalContactsSchema.rg_terceiro_contato,
      cpf_terceiro_contato:
        clientCnpjDto.AdditionalContactsSchema.cpf_terceiro_contato,
      email_terceiro_contato:
        clientCnpjDto.AdditionalContactsSchema.email_terceiro_contato,
      telefone_terceiro_contato:
        clientCnpjDto.AdditionalContactsSchema.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        clientCnpjDto.AdditionalContactsSchema.nascimento_terceiro_contato,
    };
  }
}
