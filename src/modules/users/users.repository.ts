import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from '../../common/entities/users.entity';
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/signup.dto";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
    ) {}

    async getUserByMobile(mobile: string): Promise<UsersEntity|null>{
        return this.usersRepository.findOne({where: {mobile}})
    }

    async createUser(data: CreateUserDto): Promise<UsersEntity>{
        return await this.usersRepository.save(data)
    }
    async getUserById(id: number): Promise<UsersEntity|null>{
        return this.usersRepository.findOne({where: {id}})
    }

}