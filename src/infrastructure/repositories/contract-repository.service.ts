import { ContractEntity } from './../../domain/entity/contract.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma-adapter.service';
import { ContractRepository } from 'src/domain/repository/contract.repository';

@Injectable()
export class ContractRepositoryService implements ContractRepository {
  constructor(private prisma: PrismaService) {}

  // findAll(): ClientEntity[] {
  //   throw new Error('Method not implemented.');
  // }
  // getById(): ClientEntity {
  //   throw new Error('Method not implemented.');
  // }

  async create(contractEntity: ContractEntity): Promise<string> {
    // MAP ENTITY TO PRISMA CLIENT
    const data = this.prisma.mapToPrismaContract(contractEntity);

    // CHECK IF CLIENT EMAIL ALREADY EXISTS ON THE DB
    const contract = await this.prisma.contract.findUnique({
      where: {
        cnpj_cliente: data.cnpj_cliente,
      },
    });

    // SAVE NEW CLIENT
    if (contract === null) {
      await this.prisma.contract.create({
        data,
      });

      return 'Novo Contrato Registrado';
    }

    return 'Contrato já registrado';
  }

  // update(): void {
  //   throw new Error('Method not implemented.');
  // }
  // delete(): void {
  //   throw new Error('Method not implemented.');
  // }
}
