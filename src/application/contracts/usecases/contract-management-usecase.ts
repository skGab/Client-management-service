import { ContractRegistrationDto } from '../dtos/contract-registration.dto';
import { DtoToEntityFactory } from '../../factory/dto-to-entity-factory.service';
import { Injectable, Logger } from '@nestjs/common';
import { ContractEntity } from 'src/domain/entity/contract.entity';
import { ContractRepository } from 'src/domain/repository/contract.repository';
import { ExpiringContractDto } from '../dtos/expiring-contract.dto';
import { ContractItemsDto } from '../dtos/contract-items.dto';
import { ItemsInformationVo } from 'src/domain/valueObject/items-information.vo';

@Injectable()
export class ContractManagementUsecase {
  private readonly logger = new Logger(ContractManagementUsecase.name);

  constructor(
    private contractRepositoryService: ContractRepository,
    private entityFactoryService: DtoToEntityFactory,
  ) { }

  // GET CONTRACT BY ID
  async getContractById(id: { id: string }): Promise<ContractEntity | string> {
    try {
      // CHECK IF HAS ID
      if (!id || id === undefined || id === null) return 'ID não encontrado na requisição';

      // RETURN THE CONTRACT
      const response = await this.contractRepositoryService.getContractById(id);

      if (response.error || response.message) {
        return response.error || response.message
      }

      return response.payload
    } catch (error) {
      this.logger.error(error);
      return error
    }
  }

  // CREATE CONTRACT
  async createContract(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): Promise<string> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const contract = this.entityFactoryService.mapContractToEntity(
        contractRegistrationDto,
      );

      // CREATE CONTRACT ENTITY
      const contractEntity = new ContractEntity(contract);

      // SAVE ON THE DB
      const response = await this.contractRepositoryService.create(contractEntity);

      if (response.error || response.message) {
        return response.error || response.message
      }

      return response.payload
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
    if (expiringContracts.error || expiringContracts.message) return expiringContracts.error || expiringContracts.message

    //  MAP THE OBJECT TO A DTO
    const expiringDto = expiringContracts.payload.map(
      (contract) =>
        new ExpiringContractDto(
          contract.getId(),
          contract.cnpj_cpf,
          contract.valor_total,
          contract.tipo,
          contract.data_vencimento,
          contract.termino_vigencia,
        ),
    );

    // RETURN THE DTO CONTRACTS THAT IS EXPIRING
    return expiringDto;
  }
}
