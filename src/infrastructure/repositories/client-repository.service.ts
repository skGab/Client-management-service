import { Injectable, Logger } from '@nestjs/common';
import {
  ClientRepository,
  RepositoryResponse,
} from 'src/domain/repository/client.repository';
import { PrismaService } from '../services/prisma-adapter.service';
import { BasicClientEntity } from 'src/domain/entity/client.entity';
import { ClientTableVo } from 'src/domain/valueObject/client-table.vo';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';
import { ClientFactoryService } from 'src/domain/factory/client.factory.service';
import { transcode } from 'buffer';

@Injectable()
export class ClientRepositoryService implements ClientRepository {
  private logger = new Logger(ClientRepositoryService.name);

  constructor(
    private prisma: PrismaService,
    private clientFactory: ClientFactoryService,
  ) {}

  // FIND ALL CLIENTS
  async findAll(): Promise<RepositoryResponse<ClientTableVo[]>> {
    try {
      // FEETCHING CLIENT
      const response = await this.prisma.basicClient.findMany({
        // WITH SPECIFIC FIELDS
        select: {
          id: true,
          nome_cliente: true,
          site: true,
          email: true,
          telefone: true,
          cnpj: {
            select: {
              contracts: {
                select: {
                  tipo: true,
                  termino_vigencia: true,
                },
              },
            },
          },
        },
      });

      // RETURN NULL IF ANY CLIENTS ON DB
      if (response.length === 0 || response === null)
        return new RepositoryResponse<ClientTableVo[]>(
          null,
          'Nenhum cliente encontrado no banco',
        );

      // MAP REPSONSE TO VALUE OBJECT
      const clientsVo = response.map(
        (client) =>
          new ClientTableVo(
            client.id,
            client.nome_cliente,
            client.site,
            client.email,
            client.telefone,
            client.cnpj.flatMap((c) => {
              return c.contracts.map((contract) => {
                return {
                  tipo: contract.tipo,
                  termino_vigencia: contract.termino_vigencia,
                };
              });
            }),
          ),
      );

      // RETURNING VO
      return new RepositoryResponse<ClientTableVo[]>(clientsVo);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // FIND CLIENT BY ID
  async findOne(id: string): Promise<RepositoryResponse<ClientCnpjEntity>> {
    try {
      // GET THE CLIENT
      const clientCnpj = await this.prisma.clientCnpj.findUnique({
        where: { id: id },
        include: { contracts: true },
      });

      if (clientCnpj === null || !clientCnpj)
        return new RepositoryResponse<ClientCnpjEntity>(
          null,
          'Nenhum cliente encontrado',
        );

      // MAP TO CONTRACTS ENTITY
      const contracts = clientCnpj.contracts.map((contract) =>
        this.clientFactory.toContractEntity(contract),
      );

      // MAP TO ENTITY
      const clientCnpjEntity = this.clientFactory.toClientCnpjEntity(
        clientCnpj,
        contracts,
      );

      // RETURN IT
      return new RepositoryResponse<ClientCnpjEntity>(clientCnpjEntity);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // CREATE BASIC CLIENT
  async createBasic(
    basicClientEntity: BasicClientEntity,
  ): Promise<RepositoryResponse<string>> {
    try {
      // MAP ENTITY TO PRISMA CLIENT
      const basicClientModel =
        this.prisma.mapToPrismaBasicClient(basicClientEntity);

      // CHECK IF CLIENT EMAIL ALREADY EXISTS ON THE DB
      const client = await this.prisma.basicClient.findUnique({
        where: {
          email: basicClientModel.email,
        },
      });

      if (client !== null) {
        return new RepositoryResponse<string>(null, 'Cliente já registrado');
      }

      // SAVE NEW CLIENT
      await this.prisma.basicClient.create({
        data: basicClientModel,
      });

      return new RepositoryResponse<string>('Novo cliente cadastrado');
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // CREATE BASIC CLIENT
  async createCnpj(
    clientCnpjEntity: ClientCnpjEntity,
  ): Promise<RepositoryResponse<string>> {
    try {
      //FIND RELATED CLIENT BY CNPJ OR CPF
      const basicClient = await this.prisma.basicClient.findUnique({
        select: {
          id: true,
        },
        where: {
          email: clientCnpjEntity.clientCnpj.email,
        },
      });

      // CHECK IF CLIENT EXISTS
      if (!basicClient || basicClient === null) {
        return new RepositoryResponse<string>(
          null,
          'É necessario cadastrar o CNPJ com mesmo email do cliente.',
        );
      }

      // MAP ENTITY TO PRISMA CLIENT
      const clientModel = this.prisma.mapToPrismaCnpjClient(
        clientCnpjEntity,
        basicClient,
      );

      // CHECK IF CLIENT EMAIL ALREADY EXISTS ON THE DB
      const clientCnpj = await this.prisma.clientCnpj.findUnique({
        where: {
          email: clientModel.email,
        },
      });

      if (clientCnpj !== null) {
        return new RepositoryResponse<string>(null, 'CNPJ já registrado');
      }

      // SAVE NEW CLIENT
      await this.prisma.clientCnpj.create({
        data: clientModel,
      });

      return new RepositoryResponse<string>('Novo CNPJ cadastrado');
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
