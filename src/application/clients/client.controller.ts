import { ClientRegistrationDto } from './dtos/client-registration.dto';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ClientManagementUsecase } from './client-management-usecase';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ClientFieldsDto } from './dtos/client-fields.dto';
import { ClientEntity } from 'src/domain/entity/client.entity';

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
  @Get('one/:id')
  getClientById(@Param('id') id: string): Promise<ClientEntity | string> {
    return this.clientManagementUsecase.findById(id);
  }

  // CREATE A CLIENT
  @Post('registration')
  // VALIDATION PIPE
  @UsePipes(new ZodValidationPipe(ClientRegistrationDto))
  async registerClient(
    @Body() clientRegistrationDto: (typeof ClientRegistrationDto)['_input'],
  ) {
    return await this.clientManagementUsecase.create(clientRegistrationDto);
  }

  // // UPDATE CLIENT
  // @Put()
  // updateClient(@Body() clientRegistrationDto: ClientRegistrationDto) {
  //   return this.clientManagementUsecase.create(clientRegistrationDto);
  // }

  // // DELETE CLIENT
  // @Delete()
  // deleteClient(@Body() clientRegistrationDto: ClientRegistrationDto) {
  //   return this.clientManagementUsecase.create(clientRegistrationDto);
  // }
}
