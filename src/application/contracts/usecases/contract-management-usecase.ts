import { ContractRegistrationDto } from '../dtos/contract-registration.dto';
import { DtoToEntityFactory } from '../../factory/dto-to-entity-factory.service';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { ContractEntity } from 'src/domain/entity/contract.entity';
import { ContractRepository } from 'src/domain/repository/contract.repository';
import { ExpiringContractDto } from '../dtos/expiring-contract.dto';

@Injectable()
export class ContractManagementUsecase {
  private readonly logger = new Logger(ContractManagementUsecase.name);

  constructor(
    private contractRepositoryService: ContractRepository,
    private entityFactoryService: DtoToEntityFactory,
  ) {}

  // RETURN EXPIRING CONRACTS
  async getExpiring(): Promise<ExpiringContractDto[] | string> {
    try {
      // GET CONTRACTS
      const expiringContracts =
        await this.contractRepositoryService.getExpiring();

      // RETURN AN MESSAGE OF ANY EXPIRING CONTRACTS IF IS NOT
      if (expiringContracts.message) return expiringContracts.message;

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
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // GET CONTRACT BY ID
  async getContractById(id: { id: string }): Promise<ContractEntity> {
    try {
      // RETURN THE CONTRACT
      const response = await this.contractRepositoryService.getContractById(id);

      if (response.message) throw new ConflictException(response.message);

      return response.payload;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // CREATE CONTRACT
  async createContract(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): Promise<string> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const contractEntity = this.entityFactoryService.mapContractToEntity(
        contractRegistrationDto,
      );

      // SAVE ON THE DB
      const response =
        await this.contractRepositoryService.create(contractEntity);

      if (response.message) throw new ConflictException(response.message);

      return response.payload;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
