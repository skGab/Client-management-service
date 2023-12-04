import { EntityFactoryService } from './../factory/entity-factory.service';
import { ClientRegistrationDto } from './../dtos/clientRegistration.dto';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ClientEntity } from 'src/domain/entity/client.entity';

@Injectable()
export class ClientManagementUsecase {
  private readonly logger = new Logger(ClientManagementUsecase.name);

  constructor(
    private clientRepositoryService: ClientRepository,
    private entityFactoryService: EntityFactoryService,
  ) {}

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
      const registrationForm =
        this.entityFactoryService.mapClientEntity(registrationFormDto);

      // CREATE CLIENT ENTITY
      const clientEntity = new ClientEntity(registrationForm);

      // SAVE ON THE DB
      return await this.clientRepositoryService.create(clientEntity);
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }
}
