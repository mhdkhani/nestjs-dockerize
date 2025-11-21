import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserApiBodyDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;
}

export class LoginUserApiBodyDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}