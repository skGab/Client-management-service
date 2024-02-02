import { Module } from '@nestjs/common';
import { ClientController } from './clients/controller/client.controller';
import { ClientManagementUsecase } from './clients/usecases/client-management-usecase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContractController } from './contracts/controller/contract.controller';
import { ContractManagementUsecase } from './contracts/usecases/contract-management-usecase';
import { DtoToEntityFactory } from './factory/dto-to-entity-factory.service';
import { ManageClientStatus } from './clients/services/manage-client-status.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [ClientController, ContractController],
  providers: [
    ManageClientStatus,
    ClientManagementUsecase,
    ContractManagementUsecase,
    DtoToEntityFactory,
  ],
})
export class ApplicationModule {}
