import { Body, Controller, Post } from '@nestjs/common';
import { GreenhouseOwnerService } from './greenhouse-owner.service';
import { CreateGreenHouseDto } from '../dto/create-greenhouse.dto';
import { SignInDto } from '../dto/signin.dto';

@Controller('greenhouse-owner')
export class GreenhouseOwnerController {
    constructor(private readonly greenHouseOwnerService: GreenhouseOwnerService){}


    @Post('signup')
    async signUp(@Body() createGreenHouseDto: CreateGreenHouseDto){
        return this.greenHouseOwnerService.signUp(createGreenHouseDto)
    }

    @Post('signin')
    async signIn(@Body() signInDto: SignInDto) {
        return this.greenHouseOwnerService.signIn(signInDto)
    }
}
