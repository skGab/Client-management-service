/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ClientManagementUsecase } from '../usecases/client-management-usecase';
import {
  ClientRegistrationDto,
  RegistrationSchema,
} from '../dtos/clientRegistration.dto';
import { ClientDto } from '../dtos/client.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

// DRIVING ADAPTER
@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientManagementUsecase: ClientManagementUsecase,
  ) {}

  // // RETURN ALL CLIENTS
  // @Get()
  // getAllClients() {
  //   return this.clientManagementUsecase.findAll();
  // }

  // // GET CLIENT BY ID
  // @Get(':id')
  // getClientById(@Body() clientRegistrationDto: ClientRegistrationDto) {
  //   return this.clientManagementUsecase.create(clientRegistrationDto);
  // }

  // CREATE A CLIENT
  @Post('registration')
  // VALIDATION PIPE
  @UsePipes(new ZodValidationPipe(RegistrationSchema))
  registerClient(@Body() clientRegistrationDto: ClientRegistrationDto) {
    return this.clientManagementUsecase.create(clientRegistrationDto);
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
