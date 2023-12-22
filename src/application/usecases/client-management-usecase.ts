import { Injectable, Logger } from '@nestjs/common';
import { EntityFactoryService } from './../factory/entity-factory.service';
import { ClientRegistrationDto } from '../dtos/client-registration.dto';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { ClientFieldsDto } from '../dtos/client-fields.dto';
import { ManageClientStatus } from '../services/manage-client-status.service';

@Injectable()
export class ClientManagementUsecase {
  private readonly logger = new Logger(ClientManagementUsecase.name);

  constructor(
    private clientRepositoryService: ClientRepository,
    private entityFactoryService: EntityFactoryService,
    private manageClientStatus: ManageClientStatus,
  ) {}

  // GET CLIENTS
  async findAll() {
    const response = await this.clientRepositoryService.findAll();

    if (response === null)
      return { message: 'Nenhum cliente registrado no banco' };

    const status = this.manageClientStatus.run(response);

    // MAPPING VALUE OBJECT TO DTO
    const dto = response.map(
      (client) =>
        new ClientFieldsDto(
          client.id,
          client.nome_fantasia,
          client.email,
          client.ddd,
          client.telefone,
          // status,
        ),
    );

    // RETURN CLIENT DTO
    return dto;
  }

  // CREATE CLIENTS
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
