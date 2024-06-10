import { Module } from '@nestjs/common';
import { PlotController } from './plot.controller';
import { PlotService } from './plot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plot } from '../entities/plot.entity';
import { GreenhouseOwner } from '../entities/greenhouse-owner.entity';
import { GreenhouseOwnerModule } from '../greenhouse-owner/greenhouse-owner.module';


@Module({
  imports: [TypeOrmModule.forFeature([Plot, GreenhouseOwner]),  GreenhouseOwnerModule,],
  controllers: [PlotController],
  providers: [PlotService]
})
export class PlotModule {}
