import { Injectable, Logger } from '@nestjs/common';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { PrismaService } from '../services/prisma-adapter.service';
import { BasicClientEntity } from 'src/domain/entity/client.entity';
import { ClientTableVo } from 'src/domain/valueObject/client-table.vo';
import { ContractEntity } from 'src/domain/entity/contract.entity';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';
import { ClientFactoryService } from 'src/domain/factory/client.factory.service';

@Injectable()
export class ClientRepositoryService implements ClientRepository {
  private logger = new Logger(ClientRepositoryService.name);

  constructor(
    private prisma: PrismaService,
    private clientFactory: ClientFactoryService,
  ) {}

  // FIND ALL CLIENTS
  async findAll(): Promise<ClientTableVo[]> {
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
      if (response.length === 0 || response === null) return null;

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
      return clientsVo;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  // FIND CLIENT BY ID
  async findOne(id: string): Promise<ClientCnpjEntity> {
    try {
      // GET THE CLIENT
      const clientCnpj = await this.prisma.clientCnpj.findUnique({
        where: { id: id },
        include: { contracts: true },
      });

      if (clientCnpj === null) return null;

      // MAP TO CONTRACTS ENTITY
      const contracts = clientCnpj.contracts.map((contract) =>
        this.clientFactory.toContractEntity(contract),
      );

      // MAP TO ENTITY
      const clientEntity = this.clientFactory.toClientCnpjEntity(
        clientCnpj,
        contracts,
      );

      // RETURN IT
      return clientEntity;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  // CREATE BASIC CLIENT
  async createBasic(basicClientEntity: BasicClientEntity): Promise<{ status: string }> {
    try {
      // MAP ENTITY TO PRISMA CLIENT
      const basicClientModel = this.prisma.mapToPrismaBasicClient(basicClientEntity);

      // CHECK IF CLIENT EMAIL ALREADY EXISTS ON THE DB
      const client = await this.prisma.basicClient.findUnique({
        where: {
          email: basicClientModel.email,
        },
      });

      // SAVE NEW CLIENT
      if (client === null) {
        await this.prisma.basicClient.create({
          data: basicClientModel,
        });

        return { status: 'Novo cliente Registrado' };
      }

      return { status: 'Cliente já registrado' };
    } catch (error) {
      this.logger.error(error);
      return { status: 'Erro interno no servidor' };
    }
  }

  // CREATE BASIC CLIENT
  async createCnpj(
    clientCnpjEntity: ClientCnpjEntity,
  ): Promise<{ status: string }> {
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
        return {
          status: 'É necessario cadastrar o CNPJ com mesmo email do cliente.',
        };
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

      // SAVE NEW CLIENT
      if (clientCnpj === null) {
        await this.prisma.clientCnpj.create({
          data: clientModel,
        });

        return { status: 'Novo CNPJ Registrado' };
      }

      return { status: 'CNPJ já registrado' };
    } catch (error) {
      this.logger.error(error);
      return { status: 'Erro interno no servidor' };
    }
  }
}
