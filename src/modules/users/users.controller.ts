import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { LoginUserDto } from "./dto/login.dto";
import { UsersEntity } from "src/common/entities";
import { CreateUserDto } from "./dto/signup.dto";
import { IsPublic } from '../../common/decorators/isPublic.decorator';
import type { LoginResponse } from "./dto/returnLogin.dto";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Post('signup')
    @IsPublic()
    async signUp(@Body() createUserCredentials: CreateUserDto): Promise<Partial<UsersEntity|null>>{
        return this.usersService.signUp(createUserCredentials);
    }

    @Post('login')
    @IsPublic()
    async login(@Body() credentials: LoginUserDto): Promise<LoginResponse>{
        return this.usersService.loginUser(credentials);
    }
}