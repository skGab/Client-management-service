import { EntityFactoryService } from './../factory/entity-factory.service';
import { Injectable, Logger } from '@nestjs/common';
import { ContractRegistrationDto } from '../dtos/contract-registration.dto';
import { ContractEntity } from 'src/domain/entity/contract.entity';
import { ContractRepository } from 'src/domain/repository/contract.repository';

@Injectable()
export class ContractManagementUsecase {
  private readonly logger = new Logger(ContractManagementUsecase.name);

  constructor(
    private contractRepositoryService: ContractRepository,
    private entityFactoryService: EntityFactoryService,
  ) {}

  // GET CLIENTS
  // findAll() {
  //   return this.clientRepositoryService.findAll();

  //   // const clients =
  //   // const response = clients.map((client: ClientDto) => {
  //   //   return {};
  //   // });
  // }

  // CREATE CLIENTS
  async create(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ) {
    try {
      // CONVERT DTO FORM TO ENTITY
      const ContractRegistration = this.entityFactoryService.mapContractEntity(
        contractRegistrationDto,
      );

      // CREATE CLIENT ENTITY
      const contractEntity = new ContractEntity(ContractRegistration);

      // SAVE ON THE DB
      return await this.contractRepositoryService.create(contractEntity);
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  // RETURN EXPIRING CONRACTS
  async expiring() {
    // GET CONTRACTS
    // CHECK THE EXPIRING DATE OF EACH TYPE "RECORRENTE" E "AVULSO"
    // RETURN THE DTO CONTRACTS THAT IS EXPIRING
    // RETURN AN MESSAGE OF ANY EXPIRING CONTRACTS IF IS NOT
  }
}
