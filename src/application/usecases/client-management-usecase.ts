import { ClientRepository } from 'src/domain/repository/client.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientManagementUsecase {
  constructor(private clientRepositoryService: ClientRepository) {}

  findAll() {
    return this.clientRepositoryService.findAll();
  }

  // create(clientRegistrationDto: ClientRegistrationDto) {
  //   return;
  // }
}
