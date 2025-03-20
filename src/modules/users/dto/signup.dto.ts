import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail({ blacklisted_chars: '+' }, { message: 'Invalid email value!' })
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^[+]\d{12}/, { message: 'Invalid Mobile number and country code' })
    mobile: string;

    @IsNotEmpty()
    @IsString()
    password: string;
  }