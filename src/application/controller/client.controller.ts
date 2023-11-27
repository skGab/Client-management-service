/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ClientManagementUsecase } from '../usecases/client-management-usecase';
import { ClientRegistrationDto } from '../dto/clientRegistration.dto';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientManagementUsecase: ClientManagementUsecase,
  ) {}

  // RETURN ALL CLIENTS
  @Get()
  getAllClients() {
    return this.clientManagementUsecase.findAll();
  }

  // // GET CLIENT BY ID
  // @Get()
  // getClientById(@Body() clientRegistrationDto: ClientRegistrationDto) {
  //   return this.clientManagementUsecase.create(clientRegistrationDto);
  // }

  // // CREATE A CLIENT
  // @Post('registration')
  // registerClient(@Body() clientRegistrationDto: ClientRegistrationDto) {
  //   return this.clientManagementUsecase.create(clientRegistrationDto);
  // }

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
