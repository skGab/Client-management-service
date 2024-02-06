import { ClientCnpjEntity } from '../entity/client-cnpj.entity';
import { ClientTableVo } from '../valueObject/client-table.vo';
import { BasicClientEntity } from './../entity/client.entity';
import { Injectable } from '@nestjs/common';

export class RepositoryResponse<T> {
  constructor(
    public payload?: T,
    public message?: string,
  ) {}
}

// DRIVEN PORT
@Injectable()
export abstract class ClientRepository {
  // FIND ALL CLIENTS
  abstract findAll(): Promise<RepositoryResponse<ClientTableVo[]>>;

  // FIND SPECIFIC CLIENT
  abstract findOne(id: string): Promise<RepositoryResponse<ClientCnpjEntity>>;

  // CREATE BASIC CLIENT
  abstract createBasic(
    basicClientEntity: BasicClientEntity,
  ): Promise<RepositoryResponse<string>>;

  // CREATE CNPJ
  abstract createCnpj(
    clientCnpjEntity: ClientCnpjEntity,
  ): Promise<RepositoryResponse<string>>;
}
