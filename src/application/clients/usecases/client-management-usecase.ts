import { Injectable, Logger } from '@nestjs/common';
import { DtoToEntityFactory } from '../../factory/dto-to-entity-factory.service';
import { ClientCnpjRegistrationDto } from '../dtos/client-cnpj-registration.dto';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { BasicClientEntity } from 'src/domain/entity/client.entity';
import { ShowClientsDTO } from '../dtos/show-clients.dto';
import { BasicClientDto } from '../dtos/basic-client.dto';
import { ManageClientStatus } from '../services/manage-client-status.service';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';
import { string } from 'zod';
import { response } from 'express';

@Injectable()
export class ClientManagementUsecase {
  private readonly logger = new Logger(ClientManagementUsecase.name);

  constructor(
    private clientRepositoryService: ClientRepository,
    private entityFactoryService: DtoToEntityFactory,
    private manageClientStatus: ManageClientStatus,
  ) { }

  // FIND CLIENT BY ID
  async findById(id: string): Promise<ClientCnpjEntity | { status: string }> {
    // CHECK IF HAS CLIENT ID
    if (!id)
      return { status: 'ID não encontrado na requisição' };

    // GET CLIENT
    const client = await this.clientRepositoryService.findOne(id);

    // CHECK IF HAS CLIENT
    if (client.error || client.message) {
      return { status: client.error || client.message };
    }

    return client.payload;
  }

  // GET CLIENTS
  async findAll(): Promise<ShowClientsDTO[] | { status: string }> {
    try {
      // MAKE THE REQUEST TO THE DB
      const clients = await this.clientRepositoryService.findAll();

      // CHECK IF HAS CLIENTS
      if (clients.error || clients.message)
        return { status: clients.error || clients.message };

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
      return { status: error };
    }
  }

  // CREATE CLIENTS
  async createBasicClient(
    basicClientDto: (typeof BasicClientDto)['_input'],
  ): Promise<{ status: string }> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const basicClient =
        this.entityFactoryService.mapBasicClientToEntity(basicClientDto);

      // CREATE CLIENT ENTITY
      const basicClientEntity = new BasicClientEntity(basicClient);

      // SAVE ON THE DB
      const response = await this.clientRepositoryService.createBasic(basicClientEntity);

      if (response.error || response.message) {
        return { status: response.error || response.message }
      }

      return { status: response.payload }
    } catch (error) {
      this.logger.error(error.message);
      return { status: error };
    }
  }

  // CREATE CLIENTS
  async createCnpj(
    clientCnpjDto: (typeof ClientCnpjRegistrationDto)['_input'],
  ): Promise<{ status: string }> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const clientCnpj =
        this.entityFactoryService.mapClientCnpjToEntity(clientCnpjDto);

      // CREATE CLIENT ENTITY
      const clientEntity = new ClientCnpjEntity(clientCnpj);

      // SAVE ON THE DB
      const response = await this.clientRepositoryService.createCnpj(clientEntity);

      if (response.error || response.message) {
        return { status: response.error || response.message }
      }

      return { status: response.payload }
    } catch (error) {
      this.logger.error(error.message);
      return { status: 'Erro interno no servidor' };
    }
  }
}
