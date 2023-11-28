import { Module } from '@nestjs/common';
import { ClientController } from './controller/client.controller';
import { ClientManagementUsecase } from './client/usecases/client-management-usecase';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [ClientManagementUsecase],
})
export class ApplicationModule {}
