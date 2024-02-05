import { ClientCnpjRegistrationDto } from '../dtos/client-cnpj-registration.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
    public error?: string,
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
    // GETTING CLIENTS PAYLOAD
    const payload: ShowClientsDTO[] | { status: string } =
      await this.clientManagementUsecase.findAll();

    // CHECK IF PAYLOAD HAS ANY STATUS MESSAGE
    if ('status' in payload) {
      return new ApiResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        payload.status,
      );
    }

    // RETURN RESPONSE
    return new ApiResponse<ShowClientsDTO[]>(HttpStatus.OK, payload);
  }

  // // GET CLIENT BY ID
  @Get('findOne/:id')
  async getClientById(
    @Param('id') id: string,
  ): Promise<ApiResponse<ClientCnpjEntity>> {
    // GET THE CLIENT PAYLOAD OR AN ERROR MESSAGE
    const payload: ClientCnpjEntity | { status: string } =
      await this.clientManagementUsecase.findById(id);

    // CHECK IF HAS STATUS MESSAGE AND RETURN IT
    if ('status' in payload) {
      return new ApiResponse<ClientCnpjEntity>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        payload.status,
      );
    }

    // RETURN THE CLIENT WITH 200 STATUS CODE
    return new ApiResponse<ClientCnpjEntity>(HttpStatus.OK, payload);
  }

  // BASIC CLIENT REGISTRATION
  @Post('basic/registration')
  // PIPE VALIDATION
  @UsePipes(new ZodValidationPipe(BasicClientDto))
  async basicRegistration(
    @Body() basicClientDto: (typeof BasicClientDto)['_input'],
  ): Promise<ApiResponse<{ status: string }>> {
    // TRY TO CREATE THE BASIC CLIENT
    const response =
      await this.clientManagementUsecase.createBasicClient(basicClientDto);

    // RETURN THE RESPONSE
    return new ApiResponse<{ status: string }>(HttpStatus.OK, response);
  }

  // CLIENT CNPJ REGISTRATION
  @Post('cnpj/registration')
  @UsePipes(new ZodValidationPipe(ClientCnpjRegistrationDto))
  async cnpjRegistration(
    @Body() cnpjRegistration: (typeof ClientCnpjRegistrationDto)['_input'],
  ): Promise<ApiResponse<{ status: string }>> {
    // TRY TO CREATE THE CLIENT CNPJ
    const response =
      await this.clientManagementUsecase.createCnpj(cnpjRegistration);

    // RETURN THE RESPONSE
    return new ApiResponse<{ status: string }>(HttpStatus.OK, response);
  }
}
