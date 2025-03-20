import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/common/entities";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/common/guards/jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),  
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, JwtService, JwtStrategy],
    exports: [],
})
export class UsersModule{}