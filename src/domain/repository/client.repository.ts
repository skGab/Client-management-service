import { ClientCnpjEntity } from '../entity/client-cnpj.entity';
import { ClientFieldsVo } from '../valueObject/client-fields.vo';
import { ClientEntity } from './../entity/client.entity';
import { Injectable } from '@nestjs/common';

// DRIVEN PORT
@Injectable()
export abstract class ClientRepository {
  abstract findAll(): Promise<ClientFieldsVo[]>;
  abstract findOne(id: string): Promise<ClientEntity>;
  abstract createBasic(clientEntity: ClientEntity): Promise<{ status: string }>;
  abstract createCnpj(
    clientCnpjEntity: ClientCnpjEntity,
  ): Promise<{ status: string }>;
  // abstract update(): void;
  // abstract delete(): Promise<Boolean>;
}
