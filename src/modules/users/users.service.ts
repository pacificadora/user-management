import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { LoginUserDto } from "./dto/login.dto";
import { UsersEntity } from "src/common/entities";
import { CreateUserDto } from "./dto/signup.dto";
import * as bcrypt from 'bcryptjs';
import { EnvVariable } from '../../common/contants/env.constants';
import { ConfigService } from "@nestjs/config";
import { AuthPayloadDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import type { LoginResponse } from "./dto/returnLogin.dto";
// import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository, 
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async createHashedPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async getUserByMobile(mobile: string){
        try {
            return await this.usersRepository.getUserByMobile(mobile);
        } catch (error) {
            throw error;
        }
    }

    isValidPhoneNumber(phone: string): boolean{
        const phoneRegex = /^[6-9]\d{9}$/; // Basic 10-digit Indian mobile numbers starting with 6-9
        return phoneRegex.test(phone);
    };

    async createToken(payload: AuthPayloadDto) {
        try {
          const token = this.jwtService.sign(
            { ...payload },
            {
              secret: this.configService.get<string>(EnvVariable.JWT_PUBLIC_SECRET),
              expiresIn: this.configService.get<string>(EnvVariable.JWT_EXPIRY_TIME),
            },
          );
          return token;
        } catch (error) {
          throw error;
        }
    }

    async signUp(data: CreateUserDto): Promise<Partial<UsersEntity|null>>{
        try {   
            const isValidPhone = this.isValidPhoneNumber(data.mobile);
            if(!isValidPhone) throw new BadRequestException('Invalid Mobile')

            const isAlreadyExists = await this.usersRepository.getUserByMobile(data.mobile);
            if(isAlreadyExists) throw new BadRequestException('User Already Exists with given Phone number');

            const createdUser = await this.usersRepository.createUser({
                ...data,
                password: await this.createHashedPassword(data.password)
            })
            const {password, ...userWithoutPassword} = createdUser
            return {
                ...userWithoutPassword
            };
        } catch (error) {
            throw error;
        }
    }

    async loginUser(credentials: LoginUserDto): Promise<LoginResponse> {
        try {
            const isValidPhone = this.isValidPhoneNumber(credentials.mobile);
            if(!isValidPhone) throw new BadRequestException('Invalid Mobile')

            const user = await this.usersRepository.getUserByMobile(credentials.mobile);
            if(!user) throw new NotFoundException('User Not Found With Given Number, try with another number');

            const isMatched = await bcrypt.compare(credentials.password, user.password);
            if (!isMatched) throw new BadRequestException('Incorrect Password');

            const payload: AuthPayloadDto = {
                id: user.id,
                mobile: user.mobile,
                name: user.name
            }
            const accessToken = await this.createToken(payload);
            const { password, ...userWithoutPassword } = user;

            return {
                token: accessToken,
                ...userWithoutPassword,
            };

        } catch (error) {
            throw error;
        }
    }
}