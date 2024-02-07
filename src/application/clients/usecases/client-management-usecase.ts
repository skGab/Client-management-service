import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { DtoToEntityFactory } from '../../factory/dto-to-entity-factory.service';
import { ClientCnpjRegistrationDto } from '../dtos/client-cnpj-registration.dto';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { ClientsTableDTO } from '../dtos/clients-table.dto';
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

  // GET ALL BASIC CLIENTS
  async findAllBasicClients(): Promise<ClientsTableDTO[]> {
    try {
      // MAKE THE REQUEST TO THE DB
      const clientsTableVo = await this.clientRepositoryService.findAllBasic();

      // CHECK FOR ERRORS
      if (clientsTableVo.message)
        throw new ConflictException(clientsTableVo.message);

      // MAPPING VALUE OBJECT TO DTO
      const dto = clientsTableVo.payload.map(
        (client) =>
          new ClientsTableDTO(
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

  // GET CLIENT CNPJS AND CONTRACTS
  async findCnpjsByClientId(clientID: string): Promise<ClientCnpjEntity[]> {
    try {
      // GET CLIENTS
      const cnpjEntities =
        await this.clientRepositoryService.findCnpjs(clientID);

      // CHECK IF HAS CLIENT
      if (cnpjEntities.message)
        throw new ConflictException(cnpjEntities.message);

      return cnpjEntities.payload;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // CREATE BASIC CLIENTS
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

  // CREATE CLIENT CNPJ
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
      throw error;
    }
  }
}
