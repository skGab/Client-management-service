import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { PrismaService } from '../services/prisma-adapter.service';
import { ClientEntity } from 'src/domain/entity/client.entity';

@Injectable()
export class ClientRepositoryService implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  // findAll(): ClientEntity[] {
  //   throw new Error('Method not implemented.');
  // }
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
