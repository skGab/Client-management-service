import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ApplicationModule, InfrastructureModule, ConfigModule.forRoot()],
})
export class AppModule {}
