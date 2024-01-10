import { ExpiringContractVo } from '../valueObject/expiring-contract.vo';
import { ContractEntity } from './../entity/contract.entity';
import { Injectable } from '@nestjs/common';

// DRIVEN PORT
@Injectable()
export abstract class ContractRepository {
  // abstract findAll(): Promise<ClientEntity[]>;
  abstract getContractById(id: string): Promise<ContractEntity | string>;
  abstract getExpiring(): Promise<ExpiringContractVo[]>;
  abstract create(contractEntity: ContractEntity): Promise<string>;
  // abstract update(): void;
  // abstract delete(): Promise<Boolean>;
}
