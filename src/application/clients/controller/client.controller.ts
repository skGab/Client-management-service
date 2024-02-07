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
  Post,
  UsePipes,
} from '@nestjs/common';
import { ClientManagementUsecase } from '../usecases/client-management-usecase';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { ShowClientsDTO } from '../dtos/show-clients.dto';
import { BasicClientDto } from '../dtos/basic-client.dto';
import { ClientCnpjEntity } from 'src/domain/entity/client-cnpj.entity';

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
  async getAllClients(): Promise<ApiResponse<ShowClientsDTO[]>> {
    try {
      // FIND ALL CLIENTS
      const payload = await this.clientManagementUsecase.findAll();

      return new ApiResponse<ShowClientsDTO[]>(HttpStatus.OK, payload);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro interno no servidor');
    }
  }

  // // GET CLIENT CNPJ BY ID
  @Get('findOne/:id')
  async getClientById(
    @Param('id') id: string,
  ): Promise<ApiResponse<ClientCnpjEntity>> {
    try {
      // CHECK IF HAS CLIENT ID
      if (!id)
        throw new BadRequestException(
          'ID não encontrado no corpo da requisição',
        );

      // GET THE CLIENT PAYLOAD OR AN ERROR MESSAGE
      const payload: ClientCnpjEntity =
        await this.clientManagementUsecase.findById(id);

      return new ApiResponse<ClientCnpjEntity>(HttpStatus.OK, payload);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      if (error instanceof ConflictException) {
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
      throw new InternalServerErrorException('Erro interno no servidor');
    }
  }
}
