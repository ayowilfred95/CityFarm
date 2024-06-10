import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GreenhouseOwner } from '../entities/greenhouse-owner.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateGreenHouseDto } from '../dto/create-greenhouse.dto';
import { SignInDto } from '../dto/signin.dto';

@Injectable()
export class GreenhouseOwnerService {
    constructor(
        @InjectRepository(GreenhouseOwner) private greenhouseOwnerRepository: Repository<GreenhouseOwner>,
        private jwtService: JwtService
    ){}


    async signUp(createGreenHouseOwnerDto: CreateGreenHouseDto): Promise<{greenHouseOwner: GreenhouseOwner, message: string}> {
        try {
            const {email,password,name} = createGreenHouseOwnerDto;

            const existOwner = await this.greenhouseOwnerRepository.findOne({where:{email}});

            if(existOwner) throw new ConflictException('Email already exist')

            const hashedPassword = await bcrypt.hash(password,10)

            const owner = this.greenhouseOwnerRepository.create({
                email,
                password:hashedPassword,
                name
            });

            await this.greenhouseOwnerRepository.save(owner)
            return {message:"Green house owner successfully created ", greenHouseOwner:owner}
            
        } catch (error) {
            throw error
        }
    }


    async signIn(signInDto: SignInDto):Promise<{greenHouseOwner: GreenhouseOwner, message:string, accessToken: string}>{

        try {
            const {email,password} = signInDto;

        // check if user exists
        const owner = await this.greenhouseOwnerRepository.findOne({where:{email}});

        if(!owner) throw new UnauthorizedException("Invalid Email");

        const passwordValid = await bcrypt.compare(password,owner.password);
        if(!passwordValid) throw new UnauthorizedException("Invalid Password")
            // include role in payload
        const payload = { email, sub: owner.id, role: 'greenhouseOwner' };
        
        const accessToken = await this.jwtService.sign(payload);

        return{message:"Green House Owner Signed In successfully",greenHouseOwner:owner, accessToken}
        } catch (error) {
            throw error;
        }

    }

}
