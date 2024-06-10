import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "src/city-farm/entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly configService: ConfigService, // Inject ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'), // Fetch JWT secret from environment variable or use default value
        });
    }

    async validate(payload: any) {
        const { email } = payload;
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
