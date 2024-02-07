import { ContractRegistrationDto } from '../contracts/dtos/contract-registration.dto';
import { ClientCnpjRegistrationDto } from '../clients/dtos/client-cnpj-registration.dto';
import { ContractEntity } from 'src/domain/entity/contract.entity';
import { BasicClientEntity } from 'src/domain/entity/basic-client.entity';
import { BasicClientDto } from '../clients/dtos/basic-client.dto';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DtoToEntityFactory {
  // MAP BASIC CLIENT DTO TO BASIC CLIENT ENTITY
  public mapBasicClientToEntity(
    basicClientDto: (typeof BasicClientDto)['_input'],
  ): BasicClientEntity {
    return new BasicClientEntity({
      nome_cliente: basicClientDto.nome_cliente,
      site: basicClientDto.site,
      email: basicClientDto.email,
      telefone: basicClientDto.telefone,
    });
  }

  // MAP CLIENT CNPJ DTO TO CLIENT CNPJ ENTITY
  public mapClientCnpjToEntity(
    clientCnpjDto: (typeof ClientCnpjRegistrationDto)['_input'],
  ): ClientCnpjEntity {
    return new ClientCnpjEntity({
      // Mapping for BasicInfo
      razao_social: clientCnpjDto.info_basica.razao_social,
      nome_cliente: clientCnpjDto.info_basica.nome_cliente,
      site: clientCnpjDto.info_basica.site,
      cnpj_cpf: clientCnpjDto.info_basica.cnpj_cpf,
      insc_estadual: clientCnpjDto.info_basica.insc_estadual,
      email: clientCnpjDto.info_basica.email,

      // Mapping for ContactInfo
      endereco_atendimento: clientCnpjDto.info_contrato.endereco_atendimento,
      bairro: clientCnpjDto.info_contrato.bairro,
      cep: clientCnpjDto.info_contrato.cep,
      cidade: clientCnpjDto.info_contrato.cidade,
      estado: clientCnpjDto.info_contrato.estado,
      ddd: clientCnpjDto.info_contrato.ddd,
      fax: clientCnpjDto.info_contrato.fax,
      telefone: clientCnpjDto.info_contrato.telefone,

      // Mapping for BillingInfo
      endereco_faturamento: clientCnpjDto.info_pagamento.endereco_faturamento,
      bairro_faturamento: clientCnpjDto.info_pagamento.bairro_faturamento,
      cep_faturamento: clientCnpjDto.info_pagamento.cep_faturamento,
      cidade_faturamento: clientCnpjDto.info_pagamento.cidade_faturamento,
      estado_faturamento: clientCnpjDto.info_pagamento.estado_faturamento,
      ddd_faturamento: clientCnpjDto.info_pagamento.ddd_faturamento,
      fax_faturamento: clientCnpjDto.info_pagamento.fax_faturamento,
      telefone_faturamento: clientCnpjDto.info_pagamento.telefone_faturamento,
      email_boleto_notas: clientCnpjDto.info_pagamento.email_boleto_notas,
      emissao_nota: clientCnpjDto.info_pagamento.email_boleto_notas,
      retencao_iss: clientCnpjDto.info_pagamento.retencao_iss,
      forma_recebimento: clientCnpjDto.info_pagamento.forma_recebimento,

      // Mapping for FinancialResponsible
      responsavel_financeiro:
        clientCnpjDto.info_financeiro.responsavel_financeiro,
      ddd_financeiro: clientCnpjDto.info_financeiro.ddd_financeiro,
      telefone_financeiro: clientCnpjDto.info_financeiro.telefone_financeiro,
      email_financeiro: clientCnpjDto.info_financeiro.email_financeiro,

      // Mapping for LegalRepresentative
      nome_representante: clientCnpjDto.info_representante.nome_representante,
      estado_civil_representante:
        clientCnpjDto.info_representante.estado_civil_representante,
      profissao_representante:
        clientCnpjDto.info_representante.profissao_representante,
      rg_representante: clientCnpjDto.info_representante.rg_representante,
      cpf_representante: clientCnpjDto.info_representante.cpf_representante,
      email_representante: clientCnpjDto.info_representante.email_representante,
      telefone_representante:
        clientCnpjDto.info_representante.telefone_representante,
      nascimento_representante:
        clientCnpjDto.info_representante.nascimento_representante,

      // Mapping for AdditionalContacts
      nome_segundo_contato:
        clientCnpjDto.info_contato_adicional.nome_segundo_contato,
      estado_civil_segundo_contato:
        clientCnpjDto.info_contato_adicional.estado_civil_segundo_contato,
      profissao_segundo_contato:
        clientCnpjDto.info_contato_adicional.profissao_segundo_contato,
      rg_segundo_contato:
        clientCnpjDto.info_contato_adicional.rg_segundo_contato,
      cpf_segundo_contato:
        clientCnpjDto.info_contato_adicional.cpf_segundo_contato,
      email_segundo_contato:
        clientCnpjDto.info_contato_adicional.email_segundo_contato,
      telefone_segundo_contato:
        clientCnpjDto.info_contato_adicional.telefone_segundo_contato,
      nascimento_segundo_contato:
        clientCnpjDto.info_contato_adicional.nascimento_segundo_contato,
      nome_terceiro_contato:
        clientCnpjDto.info_contato_adicional.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        clientCnpjDto.info_contato_adicional.estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        clientCnpjDto.info_contato_adicional.profissao_terceiro_contato,
      rg_terceiro_contato:
        clientCnpjDto.info_contato_adicional.rg_terceiro_contato,
      cpf_terceiro_contato:
        clientCnpjDto.info_contato_adicional.cpf_terceiro_contato,
      email_terceiro_contato:
        clientCnpjDto.info_contato_adicional.email_terceiro_contato,
      telefone_terceiro_contato:
        clientCnpjDto.info_contato_adicional.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        clientCnpjDto.info_contato_adicional.nascimento_terceiro_contato,
    });
  }

  // MAP CONTRACT DTO TO CONTRACT ENTITY
  public mapContractToEntity(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): ContractEntity {
    return new ContractEntity({
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
    });
  }
}
