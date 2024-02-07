import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { DtoToEntityFactory } from '../../factory/dto-to-entity-factory.service';
import { ClientCnpjRegistrationDto } from '../dtos/client-cnpj-registration.dto';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { ShowClientsDTO } from '../dtos/show-clients.dto';
import { BasicClientDto } from '../dtos/basic-client.dto';
import { ManageClientStatus } from '../services/manage-client-status.service';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';

@Injectable()
export class ClientManagementUsecase {
  private readonly logger = new Logger(ClientManagementUsecase.name);

  constructor(
    private clientRepositoryService: ClientRepository,
    private entityFactoryService: DtoToEntityFactory,
    private manageClientStatus: ManageClientStatus,
  ) {}

  // GET CLIENTS
  async findAll(): Promise<ShowClientsDTO[]> {
    try {
      // MAKE THE REQUEST TO THE DB
      const clients = await this.clientRepositoryService.findAll();

      // CHECK FOR ERRORS
      if (clients.message) throw new ConflictException(clients.message);

      // MAPPING VALUE OBJECT TO DTO
      const dto = clients.payload.map(
        (client) =>
          new ShowClientsDTO(
            client.id,
            client.nome_cliente,
            client.site,
            client.email,
            client.telefone,
            this.manageClientStatus.run(client),
          ),
      );

      // RETURN CLIENT DTO
      return dto;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // FIND CLIENT BY ID
  async findById(id: string): Promise<ClientCnpjEntity> {
    try {
      // GET CLIENT
      const client = await this.clientRepositoryService.findOne(id);

      // CHECK IF HAS CLIENT
      if (client.message) throw new ConflictException(client.message);

      return client.payload;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // CREATE CLIENTS
  async createBasicClient(
    basicClientDto: (typeof BasicClientDto)['_input'],
  ): Promise<string> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const basicClientEntity =
        this.entityFactoryService.mapBasicClientToEntity(basicClientDto);

      // SAVE ON THE DB
      const response =
        await this.clientRepositoryService.createBasic(basicClientEntity);

      if (response.message) throw new ConflictException(response.message);

      return response.payload;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  // CREATE CLIENTS
  async createCnpj(
    clientCnpjDto: (typeof ClientCnpjRegistrationDto)['_input'],
  ): Promise<string> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const clientEntity =
        this.entityFactoryService.mapClientCnpjToEntity(clientCnpjDto);

      // SAVE ON THE DB
      const response =
        await this.clientRepositoryService.createCnpj(clientEntity);

      if (response.message) throw new ConflictException(response.message);

      return response.payload;
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }
}
