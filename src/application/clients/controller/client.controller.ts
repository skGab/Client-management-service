import { ClientCnpjRegistrationDto } from '../dtos/client-cnpj-registration.dto';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ClientManagementUsecase } from '../usecases/client-management-usecase';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { ClientsTableDTO } from '../dtos/clients-table.dto';
import { BasicClientDto } from '../dtos/basic-client.dto';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';
import { number, string } from 'zod';

// API RESPONSE
export class ApiResponse<T> {
  constructor(
    public status: number,
    public payload?: T,
  ) {}
}

// DRIVING ADAPTER
@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientManagementUsecase: ClientManagementUsecase,
  ) {}

  // RETURN ALL CLIENTS
  @Get()
  async getAllBasic(): Promise<ApiResponse<ClientsTableDTO[]>> {
    try {
      // FIND ALL CLIENTS
      const payload = await this.clientManagementUsecase.findAllBasicClients();

      return new ApiResponse<ClientsTableDTO[]>(HttpStatus.OK, payload);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro interno no servidor');
    }
  }

  // GET CNPJS AND CONTRACTS
  @Get(':id')
  async getCnpjs(
    @Param('id')
    clientID: string,
  ): Promise<ApiResponse<ClientCnpjEntity[]>> {
    try {
      // GET THE CLIENT PAYLOAD OR AN ERROR MESSAGE
      const payload =
        await this.clientManagementUsecase.findCnpjsByClientId(clientID);

      return new ApiResponse<ClientCnpjEntity[]>(HttpStatus.OK, payload);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro interno no servidor');
    }
  }

  // BASIC CLIENT REGISTRATION
  @Post('basic/registration')
  @UsePipes(new ZodValidationPipe(BasicClientDto))
  // VALIDATION _____
  async basicRegistration(
    @Body() basicClientDto: (typeof BasicClientDto)['_input'],
  ): Promise<ApiResponse<string>> {
    try {
      // CREATE BASIC CLIENT
      const response =
        await this.clientManagementUsecase.createBasicClient(basicClientDto);

      return new ApiResponse<string>(HttpStatus.OK, response);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro interno no servidor');
    }
  }

  // CLIENT CNPJ REGISTRATION
  @Post('cnpj/registration')
  @UsePipes(new ZodValidationPipe(ClientCnpjRegistrationDto))
  // VALIDATION _____
  async cnpjRegistration(
    @Body() cnpjRegistration: (typeof ClientCnpjRegistrationDto)['_input'],
  ): Promise<ApiResponse<string>> {
    try {
      // CREATE CNPJ
      const response =
        await this.clientManagementUsecase.createCnpj(cnpjRegistration);

      return new ApiResponse<string>(HttpStatus.OK, response);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro interno no servidor');
    }
  }
}
