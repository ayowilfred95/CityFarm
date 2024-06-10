import { IsEmail } from "class-validator";

export class CreateGreenHouseDto {

    @IsEmail()
    email: string;
    password: string;
    name: string;

}
