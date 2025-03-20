import { IsNotEmpty, IsString } from "class-validator";

export class AuthPayloadDto {
    @IsNotEmpty()
    @IsString()
    id: number;

    @IsNotEmpty()
    @IsString()
    mobile: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;
}