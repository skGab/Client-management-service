import { Injectable, Logger } from '@nestjs/common';
import { EntityFactoryService } from '../factory/entity-factory.service';
import { ClientCnpjRegistrationDto } from './dtos/client-cnpj-registration.dto';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { ClientTableDto } from './dtos/clients-table.dto';
import { BasicClientDto } from './dtos/basic-client.dto';
import { ManageClientStatus } from './services/manage-client-status.service';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';

@Injectable()
export class ClientManagementUsecase {
  private readonly logger = new Logger(ClientManagementUsecase.name);

  constructor(
    private clientRepositoryService: ClientRepository,
    private entityFactoryService: EntityFactoryService,
    private manageClientStatus: ManageClientStatus,
  ) {}

  // FIND CLIENT BY ID
  async findById(id: string): Promise<ClientCnpjEntity | { status: string }> {
    try {
      // CHECK IF HAS CLIENT ID
      if (!id || id === null || id === undefined)
        return { status: 'ID não encontrado na requisição' };

      // GET CLIENT
      const client = await this.clientRepositoryService.findOne(id);

      // CHECK IF HAS CLIENT
      if (!client || client === undefined || client === null)
        return { status: 'Cliente não encontrado' };

      // RETURN IT
      return client;
    } catch (error) {
      this.logger.error(error);
      return { status: 'Erro interno no servidor' };
    }
  }

  // GET CLIENTS
  async findAll(): Promise<ClientTableDto[] | { status: string }> {
    try {
      // MAKE THE REQUEST TO THE DB
      const clients = await this.clientRepositoryService.findAll();

      // CHECK IF HAS CLIENTS
      if (clients === null)
        return { status: 'Nenhum cliente registrado no banco' };

      // MAPPING VALUE OBJECT TO DTO
      const dto = clients.map(
        (client) =>
          new ClientTableDto(
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
      return { status: 'Erro interno no servidor' };
    }
  }

  // CREATE CLIENTS
  async createClient(
    basicClientDto: (typeof BasicClientDto)['_input'],
  ): Promise<{ status: string }> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const basicClient =
        this.entityFactoryService.mapClientToEntity(basicClientDto);

      // CREATE CLIENT ENTITY
      const clientEntity = new ClientEntity(basicClient);

      // SAVE ON THE DB
      return await this.clientRepositoryService.createBasic(clientEntity);
    } catch (error) {
      this.logger.error(error.message);
      return { status: 'Erro interno do servidor' };
    }
  }

  // CREATE CLIENTS
  async createCnpj(
    clientCnpjDto: (typeof ClientCnpjRegistrationDto)['_input'],
  ): Promise<{ status: string }> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const clientCnpj =
        this.entityFactoryService.mapCnpjToEntity(clientCnpjDto);

      // CREATE CLIENT ENTITY
      const clientEntity = new ClientCnpjEntity(clientCnpj);

      // SAVE ON THE DB
      return await this.clientRepositoryService.createCnpj(clientEntity);
    } catch (error) {
      this.logger.error(error.message);
      return { status: 'Erro interno no servidor' };
    }
  }
}
