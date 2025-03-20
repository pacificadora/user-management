import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EnvVariable } from '../contants/env.constants'
import { UsersEntity } from "../entities";

export const databaseConnection: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get<string>(EnvVariable.DATABASE_HOST),
        port: configService.get<number>(EnvVariable.DATABASE_PORT),
        username: configService.get<string>(EnvVariable.DATABASE_USERNAME),
        password: configService.get<string>(EnvVariable.DATABASE_PASSWORD),
        database: configService.get<string>(EnvVariable.DATABASE_NAME),
        autoLoadEntities: true,
        entities: [UsersEntity],
        synchronize: true,
    }),
}