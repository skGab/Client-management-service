import { ExpiringContractVo } from '../valueObject/expiring-contract.vo';
import { ItemsInformationVo } from '../valueObject/items-information.vo';
import { ContractEntity } from './../entity/contract.entity';
import { Injectable } from '@nestjs/common';

// DRIVEN PORT
@Injectable()
export abstract class ContractRepository {
  // GET ALL CONTRACTS BY ID
  // abstract getAllContractsById(clientId: string): Promise<Contrac>;

  // GET UNIQUE CONTRACT
  abstract getContractById(id: {
    id: string;
  }): Promise<ContractEntity | string>;

  // GET EXPIRING CONTRACTS
  abstract getExpiring(): Promise<ExpiringContractVo[]>;

  // CREATE CONTRACTS
  abstract create(contractEntity: ContractEntity): Promise<string>;

  // // GET SOME INFORMATIONS FROM CONTRACT
  // abstract getItemsInformation(clientId: string): Promise<ItemsInformationVo[]>;
}
