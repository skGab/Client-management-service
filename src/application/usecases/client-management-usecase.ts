import { ClientRegistrationDto } from './../dtos/clientRegistration.dto';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ClientEntity, FormContract } from 'src/domain/entity/client.entity';

@Injectable()
export class ClientManagementUsecase {
  private readonly logger = new Logger(ClientManagementUsecase.name);

  constructor(private clientRepositoryService: ClientRepository) {}

  // findAll() {
  //   return this.clientRepositoryService.findAll();

  //   // const clients =
  //   // const response = clients.map((client: ClientDto) => {
  //   //   return {};
  //   // });
  // }

  async create(registrationFormDto: (typeof ClientRegistrationDto)['_input']) {
    try {
      // CONVERT DTO FORM TO ENTITY
      const registrationForm = this.mapToEntity(registrationFormDto);

      // CREATE CLIENT ENTITY
      const clientEntity = new ClientEntity(registrationForm);

      // SAVE ON THE DB
      return await this.clientRepositoryService.create(clientEntity);
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  private mapToEntity(
    registrationFormDto: (typeof ClientRegistrationDto)['_input'],
  ): FormContract {
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
