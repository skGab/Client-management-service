import { Injectable, Logger } from '@nestjs/common';
import { EntityFactoryService } from '../factory/entity-factory.service';
import { ClientCnpjRegistrationDto } from './dtos/client-cnpj-registration.dto';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { ClientEntity } from 'src/domain/entity/client.entity';
<<<<<<< HEAD
import { ClientFieldsDto } from './dtos/clients-table.dto';
import { ManageClientStatus } from './manage-client-status.service';
import { ClientBasicDto } from './dtos/client-basic.dto';
=======
import { ClientFieldsDto } from './dtos/client-fields.dto';
import { ManageClientStatus } from './services/manage-client-status.service';
>>>>>>> 22fdb40934b4495725ee2648030b6d6c631cedf1

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
  async createClient(
    clientBasicDto: (typeof ClientBasicDto)['_input'],
  ): Promise<string> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const registrationForm =
        this.entityFactoryService.mapClientToEntity(clientBasicDto);

      // CREATE CLIENT ENTITY
      const clientEntity = new ClientEntity(registrationForm);

      // SAVE ON THE DB
      return await this.clientRepositoryService.create(clientEntity);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  // CREATE CLIENTS
  async createCnpj(
    registrationFormDto: (typeof ClientCnpjRegistrationDto)['_input'],
  ): Promise<string> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const registrationForm =
        this.entityFactoryService.mapClientToEntity(registrationFormDto);

      // CREATE CLIENT ENTITY
      const clientEntity = new ClientEntity(registrationForm);

      // SAVE ON THE DB
      return await this.clientRepositoryService.create(clientEntity);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
