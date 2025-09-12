import { 
    IsEmail, 
    IsNotEmpty, 
    IsString, 
    MinLength
} from "class-validator";

export class UserDto{

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @IsString()
    @MinLength(10)
    phone: string;

    @IsString()
    rol: string;
}