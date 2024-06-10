import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // database configuration goes here
        type: "postgres",
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        database: configService.getOrThrow("POSTGRES_NAME"),
        username: configService.getOrThrow("POSTGRES_USER"),
        password: configService.getOrThrow("POSTGRES_PASSWORD"),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow("POSTGRES_SYNCHRONIZE"),
        logging: true,

      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
