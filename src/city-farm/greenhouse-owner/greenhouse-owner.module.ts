// src/city-farm/greenhouse-owner/greenhouse-owner.module.ts
import { Module } from '@nestjs/common';
import { GreenhouseOwnerController } from './greenhouse-owner.controller';
import { GreenhouseOwnerService } from './greenhouse-owner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GreenhouseOwner } from '../entities/greenhouse-owner.entity';
import { JwtStrategyGreenHouse } from './greenhouse-uthentication/jwt.strategy';
import { JwtAuthGuard } from './greenhouse-uthentication/jwt-auth.guard';
import { RolesGuard } from './greenhouse-uthentication/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([GreenhouseOwner]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GreenhouseOwnerController],
  providers: [GreenhouseOwnerService, JwtStrategyGreenHouse, JwtAuthGuard, RolesGuard],
  exports: [GreenhouseOwnerService, JwtAuthGuard, RolesGuard],
})
export class GreenhouseOwnerModule {}
