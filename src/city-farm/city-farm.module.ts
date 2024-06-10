import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Booking } from './entities/booking.entity';
import { Notification } from './entities/notification.entity';
import { Plot } from './entities/plot.entity';
import { Profile } from './entities/profile.entity';
import { UserModule } from './user/user.module';
import { GreenhouseOwner } from './entities/greenhouse-owner.entity';
import { GreenhouseOwnerModule } from './greenhouse-owner/greenhouse-owner.module';
import { PlotModule } from './plot/plot.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,Booking,Notification, Plot, Profile,GreenhouseOwner]), UserModule, GreenhouseOwnerModule, PlotModule],
  controllers: [],
  providers: [],
})
export class CityFarmModule {}
