import { ContractRegistrationDto } from './dtos/contract-registration.dto';
import { EntityFactoryService } from '../factory/entity-factory.service';
import { Injectable, Logger } from '@nestjs/common';
import { ContractEntity } from 'src/domain/entity/contract.entity';
import { ContractRepository } from 'src/domain/repository/contract.repository';
import { ExpiringContractDto } from './dtos/expiring-contract.dto';
import { ContractItemsDto } from './dtos/contract-items.dto';
import { ItemsInformationVo } from 'src/domain/valueObject/items-information.vo';

@Injectable()
export class ContractManagementUsecase {
  private readonly logger = new Logger(ContractManagementUsecase.name);

  constructor(
    private contractRepositoryService: ContractRepository,
    private entityFactoryService: EntityFactoryService,
  ) {}

  // GET CONTRACT ITEMS
  async getItems(clientId: string): Promise<ContractItemsDto[] | string> {
    // GET THE DATA FROM THE DB
    const response =
      await this.contractRepositoryService.getItemsInformation(clientId);

    function periodicidadeChecker(info: ItemsInformationVo): number {
      switch (info.periodicidade) {
        case 'mensal':
          return 1;
        case 'bimestral':
          return 2;
        case 'trimestral':
          return 3;
        case 'semestral':
          return 6;

        default:
          return 0; // or a default value
      }
    }

    // PUT THE RESPONSE ON THE DTO OBJECT
    const servicos = response.map((info) => {
      const servicosAvulsos = [];

      return {
        nome: info.servicos_prestados,
        // IF THE CONTRACT HAS "AVULSO" TYPE, SO THE NUMBER OF THE CONTRACTS FOUND REPRESENTS THE AMOUT OF SERVICES
        // IF THE CONTRACTS HAS "RECORRENTE" TYPE, SÓ THE NUMBER OF SERVICES IS BASED ON THE "PERIODICIDADE" FIELD
        quantidade: info.tipo === 'recorrente' ? periodicidadeChecker(info) : 1,
      };
    });

    // DTO MAP
    const itemsDto = servicos.map((servico) => {
      return new ContractItemsDto(servico);
    });

    // RETURN THE DATA
    return itemsDto;
  }

  // GET CONTRACT BY ID
  async getContractById(id: { id: string }): Promise<ContractEntity | string> {
    try {
      // CHECK IF HAS ID
      if (!id || id === undefined || id === null) return 'ID não encontrado';

      // RETURN THE CONTRACT
      return await this.contractRepositoryService.getContractById(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // CREATE CONTRACT
  async createContract(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): Promise<string> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const ContractRegistration = this.entityFactoryService.mapContractEntity(
        contractRegistrationDto,
      );

      // CREATE CONTRACT ENTITY
      const contractEntity = new ContractEntity(ContractRegistration);

      // SAVE ON THE DB
      return await this.contractRepositoryService.create(contractEntity);
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  // RETURN EXPIRING CONRACTS
  async getExpiring(): Promise<ExpiringContractDto[] | string> {
    // GET CONTRACTS
    const expiringContracts =
      await this.contractRepositoryService.getExpiring();

    // RETURN AN MESSAGE OF ANY EXPIRING CONTRACTS IF IS NOT
    if (!expiringContracts) return 'Nenhum contrato a vencer';

    //  MAP THE OBJECT TO A DTO
    const expiringDto = expiringContracts.map(
      (contract) =>
        new ExpiringContractDto(
          contract.getId(),
          contract.cnpj_cpf,
          contract.email_contato,
          contract.tipo,
          contract.data_vencimento,
          contract.termino_vigencia,
        ),
    );

    // RETURN THE DTO CONTRACTS THAT IS EXPIRING
    return expiringDto;
  }
}
