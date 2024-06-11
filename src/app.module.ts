import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { CityFarmModule } from './city-farm/city-farm.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), DatabaseModule, ItemsModule, CityFarmModule,
    PrometheusModule.register({
      path:"/mymetrics",
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
