import { Injectable, Logger } from '@nestjs/common';
import { ContractRegistrationDto } from '../dtos/contractRegistration.dto';
import {
  ContractEntity,
  ContractRegistration,
} from 'src/domain/entity/contract.entity';

@Injectable()
export class ContractManagementUsecase {
  private readonly logger = new Logger(ContractManagementUsecase.name);

  constructor(private contractRepositoryService: any) {}

  // findAll() {
  //   return this.clientRepositoryService.findAll();

  //   // const clients =
  //   // const response = clients.map((client: ClientDto) => {
  //   //   return {};
  //   // });
  // }

  async create(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ) {
    try {
      // CONVERT DTO FORM TO ENTITY
      const registrationForm = this.mapToEntity(contractRegistrationDto);

      // CREATE CLIENT ENTITY
      const contractEntity = new ContractEntity(registrationForm);

      // SAVE ON THE DB
      return await this.contractRepositoryService.create(contractEntity);
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  private mapToEntity(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): ContractRegistration {
    return {
      cliente_novo: contractRegistrationDto.cliente_novo,
      cnpj_cliente: contractRegistrationDto.cnpj_cliente,
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
      inicio_vigencia: contractRegistrationDto.recorrente.inicio_vigencia,
      termino_vigencia: contractRegistrationDto.recorrente.termino_vigencia,
      periodicidade: contractRegistrationDto.recorrente.periodicidade,
      valor_do_periodo: contractRegistrationDto.recorrente.valor_do_periodo,
      observacoes_adicionais:
        contractRegistrationDto.recorrente.observacoes_adicionais,

      //   AVULSO
      valor_total_servicos: contractRegistrationDto.avulso.valor_total_servicos,
      numero_parcelas: contractRegistrationDto.avulso.numero_parcelas,
      data_vencimento: contractRegistrationDto.avulso.data_vencimento,
      observacoes_adicionais_nota_fiscal:
        contractRegistrationDto.avulso.observacoes_adicionais_nota_fiscal,
    };
  }
}
