import { Module } from '@nestjs/common';
import { ClientController } from './controller/client.controller';
import { ClientManagementUsecase } from './usecases/client-management-usecase';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [ClientController],
  providers: [ClientManagementUsecase],
})
export class ApplicationModule {}
