import { ContractRegistrationDto } from './../dtos/contract-registration.dto';
import { EntityFactoryService } from './../factory/entity-factory.service';
import { Injectable, Logger } from '@nestjs/common';
import { ContractEntity } from 'src/domain/entity/contract.entity';
import { ContractRepository } from 'src/domain/repository/contract.repository';
import { ExpiringContractDto } from '../dtos/expiring-contract.dto';

@Injectable()
export class ContractManagementUsecase {
  private readonly logger = new Logger(ContractManagementUsecase.name);

  constructor(
    private contractRepositoryService: ContractRepository,
    private entityFactoryService: EntityFactoryService,
  ) {}

  // GET
  // findAll() {
  //   return this.clientRepositoryService.findAll();

  //   // const  =
  //   // const response = .map((client: ClientDto) => {
  //   //   return {};
  //   // });
  // }

  // GET CONTRACT BY ID
  async getContractById(id: string): Promise<ContractEntity | string> {
    try {
      // CHECK IF HAS ID
      if (!id || id === undefined || id === null) return 'ID não encontrado';

      // RETURN THE CONTRACT
      return await this.contractRepositoryService.getContractById(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // CREATE CONTRACT
  async create(
    contractRegistrationDto: (typeof ContractRegistrationDto)['_input'],
  ): Promise<string> {
    try {
      // CONVERT DTO FORM TO ENTITY
      const ContractRegistration = this.entityFactoryService.mapContractEntity(
        contractRegistrationDto,
      );

      // CREATE CONTRACT ENTITY
      const contractEntity = new ContractEntity(ContractRegistration);

      // SAVE ON THE DB
      return await this.contractRepositoryService.create(contractEntity);
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  // RETURN EXPIRING CONRACTS
  async expiring(): Promise<ExpiringContractDto[] | string> {
    // GET CONTRACTS
    const expiringContracts =
      await this.contractRepositoryService.getExpiring();

    // RETURN AN MESSAGE OF ANY EXPIRING CONTRACTS IF IS NOT
    if (!expiringContracts) return 'Nenhum contrato a vencer';

    //  MAP THE OBJECT TO A DTO
    const expiringDto = expiringContracts.map(
      (contract) =>
        new ExpiringContractDto(
          contract.getId(),
          contract.cnpj_cpf,
          contract.email_contato,
          contract.tipo,
          contract.data_vencimento,
          contract.termino_vigencia,
        ),
    );

    // RETURN THE DTO CONTRACTS THAT IS EXPIRING
    return expiringDto;
  }
}
