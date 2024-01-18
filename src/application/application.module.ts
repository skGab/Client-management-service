import { Module } from '@nestjs/common';
import { ClientController } from './clients/client.controller';
import { ClientManagementUsecase } from './clients/client-management-usecase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ContractController } from './contracts/contract.controller';
import { ContractManagementUsecase } from './contracts/contract-management-usecase';
import { EntityFactoryService } from './factory/entity-factory.service';
import { ManageClientStatus } from './clients/services/manage-client-status.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [ClientController, ContractController],
  providers: [
    ManageClientStatus,
    ClientManagementUsecase,
    ContractManagementUsecase,
    EntityFactoryService,
  ],
})
export class ApplicationModule {}
