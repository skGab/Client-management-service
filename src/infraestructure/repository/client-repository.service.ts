import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/domain/repository/client.repository';

@Injectable()
export class ClientRepositoryService implements ClientRepository {
  constructor() {}

  findAll(): void {
    throw new Error('Method not implemented.');
  }
  getById(): void {
    throw new Error('Method not implemented.');
  }
  create(): void {
    throw new Error('Method not implemented.');
  }
  update(): void {
    throw new Error('Method not implemented.');
  }
  delete(): void {
    throw new Error('Method not implemented.');
  }
}
