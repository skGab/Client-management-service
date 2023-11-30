import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { PrismaService } from '../services/prisma-adapter.service';
import { Prisma } from '@prisma/client';
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
    const data = this.prisma.mapToPrismaClient(clientEntity);

    return this.prisma.client.create({
      data,
    });
  }

  // update(): void {
  //   throw new Error('Method not implemented.');
  // }
  // delete(): void {
  //   throw new Error('Method not implemented.');
  // }
}
