/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { ContractRegistrationDto } from '../dtos/contract-registration.dto';
import { ContractManagementUsecase } from '../usecases/contract-management-usecase';
import { ApiResponse } from 'src/application/clients/controller/client.controller';
import { ExpiringContractDto } from '../dtos/expiring-contract.dto';
import { ContractEntity } from 'src/domain/entity/contract.entity';

// DRIVING ADAPTER
@Controller('contracts')
export class ContractController {
  constructor(
    private readonly contractManagementUsecase: ContractManagementUsecase,
  ) {}

  // EXPIRING CONTRACTS
  @Get('expiring')
  async expiring(): Promise<ApiResponse<ExpiringContractDto[] | string>> {
    try {
      const payload = await this.contractManagementUsecase.getExpiring();

      return new ApiResponse<ExpiringContractDto[] | string>(
        HttpStatus.OK,
        payload,
      );
    } catch (error) {
      throw new InternalServerErrorException('Erro interno no servidor');
    }
  }

  // GET CONTRACT BY ID
  @Get('one/:id')
  async contractById(
    @Param() id: { id: string },
  ): Promise<ApiResponse<ContractEntity>> {
    try {
      // CHECK IF HAS ID
      if (!id || id === undefined || id === null)
        throw new BadRequestException(
          'ID não encontrado no corpo da requisição',
        );

      // GET CONTRACT
      const payload = await this.contractManagementUsecase.getContractById(id);

      return new ApiResponse<ContractEntity>(HttpStatus.OK, payload);
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

  // CREATE A CONTRACT
  @Post('registration')
  // VALIDATION PIPE
  @UsePipes(new ZodValidationPipe(ContractRegistrationDto))
  async register(
    @Body() contractRegistration: (typeof ContractRegistrationDto)['_input'],
  ): Promise<ApiResponse<string>> {
    try {
      const response =
        await this.contractManagementUsecase.createContract(
          contractRegistration,
        );

      return new ApiResponse<string>(HttpStatus.OK, response);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro interno no servidor');
    }
  }
}
