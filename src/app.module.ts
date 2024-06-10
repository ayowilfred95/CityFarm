import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { CityFarmModule } from './city-farm/city-farm.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), DatabaseModule, ItemsModule, CityFarmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
