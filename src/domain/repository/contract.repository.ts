import { ExpiringContractVo } from '../valueObject/expiring-contract.vo';
import { ContractEntity } from './../entity/contract.entity';
import { Injectable } from '@nestjs/common';
import { RepositoryResponse } from './client.repository';

// DRIVEN PORT
@Injectable()
export abstract class ContractRepository {
  // GET ALL CONTRACTS BY ID
  // abstract getAllContractsById(clientId: string): Promise<Contrac>;

  // GET UNIQUE CONTRACT
  abstract getContractById(id: {
    id: string;
  }): Promise<RepositoryResponse<ContractEntity>>;

  // GET EXPIRING CONTRACTS
  abstract getExpiring(): Promise<RepositoryResponse<ExpiringContractVo[]>>;

  // CREATE CONTRACTS
  abstract create(contractEntity: ContractEntity): Promise<RepositoryResponse<string>>;

  // // GET SOME INFORMATIONS FROM CONTRACT
  // abstract getItemsInformation(clientId: string): Promise<ItemsInformationVo[]>;
}
