import { ContractEntity } from './../entity/contract.entity';
import { Injectable } from '@nestjs/common';

// DRIVEN PORT
@Injectable()
export abstract class ContractRepository {
  // abstract findAll(): Promise<ClientEntity[]>;
  // abstract getById(id: string): Promise<ClientEntity>;
  abstract create(contractEntity: ContractEntity): Promise<string>;
  // abstract update(): void;
  // abstract delete(): Promise<Boolean>;
}
