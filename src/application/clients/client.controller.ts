import { ClientCnpjRegistrationDto } from './dtos/client-cnpj-registration.dto';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ClientManagementUsecase } from './client-management-usecase';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ClientFieldsDto } from './dtos/clients-table.dto';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { ClientBasicDto } from './dtos/client-basic.dto';

// DRIVING ADAPTER
@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientManagementUsecase: ClientManagementUsecase,
  ) {}

  // RETURN ALL CLIENTS
  @Get()
  async getAllClients(): Promise<ClientFieldsDto[] | { message: string }> {
    return await this.clientManagementUsecase.findAll();
  }

  // // GET CLIENT BY ID
  @Get(':id')
  getClientById(@Param('id') id: string): Promise<ClientEntity | string> {
    return this.clientManagementUsecase.findById(id);
  }

  // BASIC CLIENT REGISTRATION
  @Post('basic/registration')
  @UsePipes(new ZodValidationPipe(ClientBasicDto))
  async basicRegistration(
    @Body() clientBasicDto: (typeof ClientBasicDto)['_input'],
  ) {
    return await this.clientManagementUsecase.create(clientBasicDto);
  }

  // CLIENT CNPJ REGISTRATION
  @Post('cnpj/registration')
  @UsePipes(new ZodValidationPipe(ClientCnpjRegistrationDto))
  async clientCnpjRegistration(
    @Body() clientRegistrationDto: (typeof ClientCnpjRegistrationDto)['_input'],
  ) {
    return await this.clientManagementUsecase.create(clientRegistrationDto);
  }
}
