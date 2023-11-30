import { ClientEntity } from './../entity/client.entity';
import { Injectable } from '@nestjs/common';

// DRIVEN PORT
@Injectable()
export abstract class ClientRepository {
  // abstract findAll(): Promise<ClientEntity[]>;
  // abstract getById(id: string): Promise<ClientEntity>;
  abstract create(clientEntity: ClientEntity);
  // abstract update(): void;
  // abstract delete(): Promise<Boolean>;
}
