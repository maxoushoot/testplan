import { Module } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { WorksController } from './works/works.controller';
import { WorksService } from './works/works.service';
import { SaturationController } from './saturation/saturation.controller';
import { SaturationService } from './saturation/saturation.service';

@Module({
  imports: [],
  controllers: [WorksController, SaturationController],
  providers: [PrismaService, WorksService, SaturationService]
})
export class AppModule {}
