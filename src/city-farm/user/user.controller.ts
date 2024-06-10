import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { SignInDto } from '../dto/signin.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}


    @Post("signup")
    @UsePipes(new ValidationPipe({ transform: true }))
    async signUp(@Body() createUserDto:CreateUserDto) {
        return this.userService.signUp(createUserDto);
    }

    @Post("signin")
    async signIn(@Body() signInDto: SignInDto) {
        return this.userService.signIn(signInDto)
    }
}
