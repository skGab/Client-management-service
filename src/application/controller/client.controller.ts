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
import { ClientRegistrationDto } from '../dtos/clientRegistration.dto';
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
  @UsePipes(new ZodValidationPipe(ClientRegistrationDto))
  registerClient(
    @Body() clientRegistrationDto: (typeof ClientRegistrationDto)['_input'],
  ) {
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
