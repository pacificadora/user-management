import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    mobile: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }