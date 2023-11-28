import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { ClientRepository } from 'src/domain/repository/client.repository';

@Injectable()
export class ClientRepositoryService implements ClientRepository {
  constructor() {}

  // findAll(): ClientEntity[] {
  //   throw new Error('Method not implemented.');
  // }
  // getById(): ClientEntity {
  //   throw new Error('Method not implemented.');
  // }
  create(clientEntity: ClientEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // update(): void {
  //   throw new Error('Method not implemented.');
  // }
  // delete(): void {
  //   throw new Error('Method not implemented.');
  // }
}
