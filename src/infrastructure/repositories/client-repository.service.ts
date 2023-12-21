import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { PrismaService } from '../services/prisma-adapter.service';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { ClientFieldsVo } from 'src/domain/valueObject/client-fields.vo';

@Injectable()
export class ClientRepositoryService implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ClientFieldsVo[]> {
    try {
      // FEETCHING CLIENT
      const response = await this.prisma.client.findMany({
        // WITH SPECIFIC FIELDS
        select: {
          id: true,
          nome_fantasia: true,
          email: true,
          ddd: true,
          telefone: true,
          contracts: {
            select: {
              tipo: true,
              termino_vigencia: true,
            },
          },
        },
      });

      // RETURN NULL IF ANY CLIENTS ON DB
      if (response.length === 0 || response === null) return null;

      console.log(response);

      // MAP REPSONSE TO VALUE OBJECT
      const clientsVo = response.map(
        (client) =>
          new ClientFieldsVo(
            client.id,
            client.nome_fantasia,
            client.email,
            client.ddd,
            client.telefone,
            client.contracts.map((contract) => contract.tipo),
            client.contracts.map((contract) => contract.termino_vigencia),
          ),
      );

      // RETURNING VO
      return clientsVo;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // getById(): ClientEntity {
  //   throw new Error('Method not implemented.');
  // }

  async create(clientEntity: ClientEntity) {
    // MAP ENTITY TO PRISMA CLIENT
    const data = this.prisma.mapToPrismaClient(clientEntity);

    // CHECK IF CLIENT EMAIL ALREADY EXISTS ON THE DB
    const client = await this.prisma.client.findUnique({
      where: {
        email: data.email,
      },
    });

    // SAVE NEW CLIENT
    if (client === null) {
      await this.prisma.client.create({
        data,
      });

      return 'Novo cliente Registrado';
    }

    return 'Cliente já registrado';
  }

  // update(): void {
  //   throw new Error('Method not implemented.');
  // }
  // delete(): void {
  //   throw new Error('Method not implemented.');
  // }
}
