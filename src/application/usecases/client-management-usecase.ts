import { ClientRepository } from 'src/domain/repository/client.repository';
import { Injectable } from '@nestjs/common';
import { ClientEntity, FormContract } from 'src/domain/entity/client.entity';
import { ClientRegistrationDto } from '../dtos/clientRegistration.dto';

@Injectable()
export class ClientManagementUsecase {
  constructor(private clientRepositoryService: ClientRepository) {}

  // findAll() {
  //   return this.clientRepositoryService.findAll();

  //   // const clients =
  //   // const response = clients.map((client: ClientDto) => {
  //   //   return {};
  //   // });
  // }

  async create(clientRegistrationDto: ClientRegistrationDto): Promise<boolean> {
    // CONVERT DTO TO ENTITY
    const registrationForm = this.mapToEntity(clientRegistrationDto);

    // CREATE CLIENT ENTITY
    const clientEntity = new ClientEntity(registrationForm);

    // SAVE ON THE DB
    return this.clientRepositoryService.create(clientEntity);
  }

  private mapToEntity(
    clientRegistrationDto: ClientRegistrationDto,
  ): FormContract {
    return {
      id: clientRegistrationDto.id,
      razao_social: clientRegistrationDto.razao_social,
      nome_fantasia: clientRegistrationDto.nome_fantasia,
      site: clientRegistrationDto.site,
      cnpj_cpf: clientRegistrationDto.cnpj_cpf,
      insc_estadual: clientRegistrationDto.insc_estadual,
      email: clientRegistrationDto.email,

      //   INFO ATENDIMENTO
      endereco_atendimento: clientRegistrationDto.endereco_atendimento,
      bairro: clientRegistrationDto.bairro,
      cep: clientRegistrationDto.cep,
      cidade: clientRegistrationDto.cidade,
      estado: clientRegistrationDto.estado,
      ddd: clientRegistrationDto.ddd,
      fax: clientRegistrationDto.fax,
      telefone: clientRegistrationDto.telefone,

      //   INFO FATURAMENTO
      endereco_faturamento: clientRegistrationDto.endereco_faturamento,
      bairro_faturamento: clientRegistrationDto.bairro_faturamento,
      cep_faturamento: clientRegistrationDto.cep_faturamento,
      cidade_faturamento: clientRegistrationDto.cidade_faturamento,
      estado_faturamento: clientRegistrationDto.estado_faturamento,
      ddd_faturamento: clientRegistrationDto.ddd_faturamento,
      fax_faturamento: clientRegistrationDto.fax_faturamento,
      telefone_faturamento: clientRegistrationDto.telefone_faturamento,

      //   RESPONSAVEL FINANCEIRO
      responsavel_financeiro: clientRegistrationDto.responsavel_financeiro,
      ddd_financeiro: clientRegistrationDto.ddd_financeiro,
      telefone_financeiro: clientRegistrationDto.telefone_financeiro,
      email_financeiro: clientRegistrationDto.email_financeiro,

      // REPRESENTANTE LEGAL
      nome_representante: clientRegistrationDto.nome_representante,
      estado_civil_representante:
        clientRegistrationDto.estado_civil_representante,
      profissao_representante: clientRegistrationDto.profissao_representante,
      rg_representante: clientRegistrationDto.rg_representante,
      cpf_representante: clientRegistrationDto.cpf_representante,
      email_representante: clientRegistrationDto.email_representante,
      telefone_representante: clientRegistrationDto.telefone_representante,
      nascimento_representante: clientRegistrationDto.nascimento_representante,

      // INFO BOLETOS E NOTAS FISCAIS
      email_boleto_notas: clientRegistrationDto.email_boleto_notas,

      // TESTEMUNHA / SEGUNDO CONTATO
      nome_segundo_contato: clientRegistrationDto.nome_segundo_contato,
      estado_civil_segundo_contato:
        clientRegistrationDto.estado_civil_segundo_contato,
      profissao_segundo_contato:
        clientRegistrationDto.profissao_segundo_contato,
      rg_segundo_contato: clientRegistrationDto.rg_segundo_contato,
      cpf_segundo_contato: clientRegistrationDto.cpf_segundo_contato,
      email_segundo_contato: clientRegistrationDto.email_segundo_contato,
      telefone_segundo_contato: clientRegistrationDto.telefone_segundo_contato,
      nascimento_segundo_contato:
        clientRegistrationDto.nascimento_segundo_contato,

      // TERCEIRO CONTATO
      nome_terceiro_contato: clientRegistrationDto.nome_terceiro_contato,
      estado_civil_terceiro_contato:
        clientRegistrationDto.estado_civil_terceiro_contato,
      profissao_terceiro_contato:
        clientRegistrationDto.profissao_terceiro_contato,
      rg_terceiro_contato: clientRegistrationDto.rg_terceiro_contato,
      cpf_terceiro_contato: clientRegistrationDto.cpf_terceiro_contato,
      email_terceiro_contato: clientRegistrationDto.email_terceiro_contato,
      telefone_terceiro_contato:
        clientRegistrationDto.telefone_terceiro_contato,
      nascimento_terceiro_contato:
        clientRegistrationDto.nascimento_terceiro_contato,
    };
  }
}
