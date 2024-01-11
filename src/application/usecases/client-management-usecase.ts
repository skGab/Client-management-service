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

  // FIND CLIENT BY ID
  async findById(id: string): Promise<ClientEntity | string> {
    try {
      // CHECK IF HAS CLIENT ID
      if (!id || id === null || id === undefined)
        return 'ID não encontrado na requisição';

      // GET CLIENT
      const client = await this.clientRepositoryService.findOne(id);

      // CHECK IF HAS CLIENT
      if (!client || client === undefined || client === null)
        return 'Cliente não encontrado';

      // RETURN IT
      return client;
    } catch (error) {
      this.logger.error(error);
    }
  }

  // GET CLIENTS
  async findAll(): Promise<ClientFieldsDto[] | { message: string }> {
    try {
      // MAKE THE REQUEST TO THE DB
      const clients = await this.clientRepositoryService.findAll();

      // CHECK IF HAS CLIENTS
      if (clients === null)
        return { message: 'Nenhum cliente registrado no banco' };

      // MAPPING VALUE OBJECT TO DTO
      const dto = clients.map(
        (client) =>
          new ClientFieldsDto(
            client.id,
            client.nome_fantasia,
            client.email,
            client.ddd,
            client.telefone,
            this.manageClientStatus.run(client),
          ),
      );

      // RETURN CLIENT DTO
      return dto;
    } catch (error) {
      this.logger.error(error);
    }
  }

  // CREATE CLIENTS
  async create(
    registrationFormDto: (typeof ClientRegistrationDto)['_input'],
  ): Promise<string> {
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
    }
  }
}
