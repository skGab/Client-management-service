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
    //FIND RELATED CLIENT BY CNPJ OR CPF
    const client = await this.prisma.client.findUnique({
      select: {
        id: true,
      },
      where: {
        cnpj_cpf: contractEntity.contractRegistration.cnpj_cpf,
      },
    });

    // CHECK IF CLIENT EXISTS
    if (!client || client === null) {
      return 'É necessario cadastrar o cliente com mesmo cnpj/cpf, antes de enviar o contrato.';
    }

    // MAP ENTITY TO PRISMA CLIENT
    const data = this.prisma.mapToPrismaContract(contractEntity, client);

    // SAVE NEW CONTRACT
    await this.prisma.contract.create({
      data,
    });

    return 'Novo Contrato Registrado';
  }

  // update(): void {
  //   throw new Error('Method not implemented.');
  // }
  // delete(): void {
  //   throw new Error('Method not implemented.');
  // }
}
