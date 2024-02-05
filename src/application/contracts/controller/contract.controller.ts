/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { ContractRegistrationDto } from '../dtos/contract-registration.dto';
import { ContractManagementUsecase } from '../usecases/contract-management-usecase';
import { ContractItemsDto } from '../dtos/contract-items.dto';
import { ApiResponse } from 'src/application/clients/controller/client.controller';
import { ExpiringContractDto } from '../dtos/expiring-contract.dto';
import { ContractEntity } from 'src/domain/entity/contract.entity';

// DRIVING ADAPTER
@Controller('contracts')
export class ContractController {
  constructor(
    private readonly contractManagementUsecase: ContractManagementUsecase,
  ) { }

  // // CONTRACT ITEMS
  // @Get('items')
  // async items(
  //   @Param() clientId: { id: string },
  // ): Promise<ContractItemsDto | string> {
  //   return await this.contractManagementUsecase.getItems(clientId.id);
  // }

  // EXPIRING CONTRACTS
  @Get('expiring')
  async expiring(): Promise<ApiResponse<ExpiringContractDto[] | string>> {
    const payload = await this.contractManagementUsecase.getExpiring();

    if (typeof payload === "string") {
      return new ApiResponse<ExpiringContractDto[] | string>(HttpStatus.INTERNAL_SERVER_ERROR, payload)
    }

    return new ApiResponse<ExpiringContractDto[] | string>(HttpStatus.OK, payload)
  }

  // // GET ALL CONTRACTS BY ID
  // @Get('all/:id')
  // async allContractsById(@Param() clientId: { id: string }) {
  //   return await this.contractManagementUsecase.getAllContractsById(clientId.id);
  // }

  // GET CONTRACT BY ID
  @Get('findOne/:id')
  async contractById(@Param() id: { id: string }): Promise<ApiResponse<ContractEntity | string>> {

    const payload = await this.contractManagementUsecase.getContractById(id);

    if (typeof payload === "string") {
      return new ApiResponse<string>(HttpStatus.INTERNAL_SERVER_ERROR, payload)
    }

    return new ApiResponse<ContractEntity | string>(HttpStatus.OK, payload)
  }

  // CREATE A CONTRACT
  @Post('registration')
  // VALIDATION PIPE
  @UsePipes(new ZodValidationPipe(ContractRegistrationDto))
  async register(
    @Body() contractRegistration: (typeof ContractRegistrationDto)['_input'],
  ): Promise<ApiResponse<string>> {
    const response = await this.contractManagementUsecase.createContract(
      contractRegistration,
    );

    if (typeof response === "string") {
      return new ApiResponse<string>(HttpStatus.INTERNAL_SERVER_ERROR, response)
    }

    return new ApiResponse<string>(HttpStatus.OK, response)
  }
}
