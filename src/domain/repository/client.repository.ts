import { ClientCnpjEntity } from '../entity/client-cnpj.entity';
import { ClientTableVo } from '../valueObject/client-table.vo';
import { ClientEntity } from './../entity/client.entity';
import { Injectable } from '@nestjs/common';

// DRIVEN PORT
@Injectable()
export abstract class ClientRepository {
  // FIND ALL CLIENTS
  abstract findAll(): Promise<ClientTableVo[]>;

  // FIND SPECIFIC CLIENT
  abstract findOne(id: string): Promise<ClientCnpjEntity>;

  // CREATE BASIC CLIENT
  abstract createBasic(clientEntity: ClientEntity): Promise<{ status: string }>;

  // CREATE CNPJ
  abstract createCnpj(
    clientCnpjEntity: ClientCnpjEntity,
  ): Promise<{ status: string }>;
}
