import { OmitType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { UsersEntity } from "src/common/entities";

export class LoginResponse extends OmitType(UsersEntity, ['password'] as const) {
    @IsString()
    @IsNotEmpty()
    token: string;
}