import { ClientFieldsVo } from '../valueObject/client-fields.vo';
import { ClientEntity } from './../entity/client.entity';
import { Injectable } from '@nestjs/common';

// DRIVEN PORT
@Injectable()
export abstract class ClientRepository {
  abstract findAll(): Promise<ClientFieldsVo[]>;
  abstract findOne(id: string): Promise<ClientEntity>;
  abstract create(clientEntity: ClientEntity);
  // abstract update(): void;
  // abstract delete(): Promise<Boolean>;
}
