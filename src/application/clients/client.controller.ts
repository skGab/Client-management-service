import { ClientCnpjRegistrationDto } from './dtos/client-cnpj-registration.dto';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ClientManagementUsecase } from './client-management-usecase';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ClientTableDto } from './dtos/clients-table.dto';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { BasicClientDto } from './dtos/basic-client.dto';

// DRIVING ADAPTER
@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientManagementUsecase: ClientManagementUsecase,
  ) {}

  // RETURN ALL CLIENTS
  @Get()
  async getAllClients(): Promise<ClientTableDto[] | { message: string }> {
    return await this.clientManagementUsecase.findAll();
  }

  // // GET CLIENT BY ID
  @Get('findOne/:id')
  getClientById(@Param('id') id: string): Promise<ClientEntity | string> {
    return this.clientManagementUsecase.findById(id);
  }

  // BASIC CLIENT REGISTRATION
  @Post('basic/registration')
  @UsePipes(new ZodValidationPipe(BasicClientDto))
  async basicRegistration(
    @Body() basicClientDto: (typeof BasicClientDto)['_input'],
  ): Promise<{ status: string }> {
    return await this.clientManagementUsecase.createClient(basicClientDto);
  }

  // CLIENT CNPJ REGISTRATION
  @Post('cnpj/registration')
  @UsePipes(new ZodValidationPipe(ClientCnpjRegistrationDto))
  async cnpjRegistration(
    @Body() cnpjRegistration: (typeof ClientCnpjRegistrationDto)['_input'],
  ) {
    return await this.clientManagementUsecase.createCnpj(cnpjRegistration);
  }
}
