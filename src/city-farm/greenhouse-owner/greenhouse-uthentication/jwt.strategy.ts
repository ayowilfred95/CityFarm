import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { GreenhouseOwner } from "src/city-farm/entities/greenhouse-owner.entity";

@Injectable()
export class JwtStrategyGreenHouse extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(GreenhouseOwner) private greenhouseOwnerRepository: Repository<GreenhouseOwner>,
        private readonly configService: ConfigService, // Inject ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'), 
        });
    }

    async validate(payload: any) {
        const { email, sub, role } = payload;
        const user = await this.greenhouseOwnerRepository.findOne({ where: { email } });

        if (!user || role !== 'greenhouseOwner') {
            throw new UnauthorizedException();
          }

          return { userId: sub, email: user.email, role };
    }
}
