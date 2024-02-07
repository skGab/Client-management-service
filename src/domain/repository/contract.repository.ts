import { ExpiringContractVo } from '../valueObject/expiring-contract.vo';
import { ContractEntity } from './../entity/contract.entity';
import { Injectable } from '@nestjs/common';
import { RepositoryResponse } from './client.repository';

// DRIVEN PORT
@Injectable()
export abstract class ContractRepository {
  // GET EXPIRING CONTRACTS
  abstract getExpiring(): Promise<RepositoryResponse<ExpiringContractVo[]>>;

  // GET UNIQUE CONTRACT
  abstract getContractById(id: {
    id: string;
  }): Promise<RepositoryResponse<ContractEntity>>;

  // CREATE CONTRACTS
  abstract create(
    contractEntity: ContractEntity,
  ): Promise<RepositoryResponse<string>>;
}
