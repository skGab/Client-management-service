/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ContractRegistrationDto } from './dtos/contract-registration.dto';
import { ContractManagementUsecase } from './contract-management-usecase';
import { ContractItemsDto } from './dtos/contract-items.dto';

// DRIVING ADAPTER
@Controller('contracts')
export class ContractController {
  constructor(
    private readonly contractManagementUsecase: ContractManagementUsecase,
  ) {}

  // // CONTRACT ITEMS
  // @Get('items')
  // async items(
  //   @Param() clientId: { id: string },
  // ): Promise<ContractItemsDto | string> {
  //   return await this.contractManagementUsecase.getItems(clientId.id);
  // }

  // EXPIRING CONTRACTS
  @Get('expiring')
  async expiring() {
    return await this.contractManagementUsecase.getExpiring();
  }

  // GET ALL CONTRACTS BY ID
  @Get('all/:id')
  async allContractsById(@Param() clientId: { id: string }) {
    return await this.contractManagementUsecase.getAllContractsById(clientId.id);
  }

  // GET CONTRACT BY ID
  @Get('findOne/:id')
  async contractById(@Param() id: { id: string }) {
    return await this.contractManagementUsecase.getContractById(id);
  }

  // CREATE A CLIENT
  @Post('registration')
  // VALIDATION PIPE
  @UsePipes(new ZodValidationPipe(ContractRegistrationDto))
  async register(
    @Body() contractRegistration: (typeof ContractRegistrationDto)['_input'],
  ) {
    return await this.contractManagementUsecase.createContract(
      contractRegistration,
    );
  }
}
