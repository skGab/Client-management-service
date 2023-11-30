import { PrismaService } from './services/prisma-adapter.service';
import { Module } from '@nestjs/common';
import { ClientRepository } from 'src/domain/repository/client.repository';
import { ClientRepositoryService } from './repositories/client-repository.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,

    {
      provide: ClientRepository,
      useClass: ClientRepositoryService,
    },
  ],
  exports: [ClientRepository],
})
export class InfrastructureModule {}
