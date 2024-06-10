import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { SignInDto } from '../dto/signin.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async signUp(createUserDto: CreateUserDto):Promise<{user: User,message: string}> {
        
        try {
        const{email,password,firstName,lastName,profession} = createUserDto
        const existUser = await this.userRepository.findOne({where:{email}});
        if(existUser) throw new ConflictException('Email already exists');

        const hashedPassword = await bcrypt.hash(password,10)

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            profile: {firstName,lastName,profession},
        })
        await this.userRepository.save(user)

        // const message = `User created successfully`
        return {message: "User created successfully",user}

        } catch (error) {
            throw error
        }

    }


    async signIn(signInDto: SignInDto):Promise<{user:User, accessToken: string, message: string}> {
       try {
        const {email,password} = signInDto;
        // check if the email exist
        const user = await this.userRepository.findOne({where:{email}})

        if (!user)  throw new UnauthorizedException('Invalid Email');

        const passwordValid = await bcrypt.compare(password, user.password)
        if(!passwordValid) throw new UnauthorizedException("Invalid Password")
        const payload = { email, sub: user.id };
        const accessToken = await this.jwtService.sign(payload);

        return {message:"User signed in successfully",user, accessToken}
        
       } catch (error) {
        throw error
       }

            
    }
}
