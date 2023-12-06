import { EntityFactoryService } from './../factory/entity-factory.service';
import { Injectable, Logger } from '@nestjs/common';
import { ContractRegistrationDto } from '../dtos/contractRegistration.dto';
import { ContractEntity } from 'src/domain/entity/contract.entity';
import { ContractRepository } from 'src/domain/repository/contract.repository';

@Injectable()
export class ContractManagementUsecase {
  private readonly logger = new Logger(ContractManagementUsecase.name);

  constructor(
    private contractRepositoryService: ContractRepository,
    private entityFactoryService: EntityFactoryService,
  ) {}

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
}
