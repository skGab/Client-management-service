import { ExpiringContractVo } from '../valueObject/expiring-contract.vo';
import { ContractEntity } from './../entity/contract.entity';
import { Injectable } from '@nestjs/common';

// DRIVEN PORT
@Injectable()
export abstract class ContractRepository {
  // GET UNIQUE CONTRACT
  abstract getContractById(id: {
    id: string;
  }): Promise<ContractEntity | string>;

  // GET EXPIRING CONTRACTS
  abstract getExpiring(): Promise<ExpiringContractVo[]>;

  // CREATE CONTRACTS
  abstract create(contractEntity: ContractEntity): Promise<string>;
}
