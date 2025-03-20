import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConnection } from 'src/common/database';
import { UsersModule } from '../users/users.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionFilter } from 'src/common/filters/error.filter';
import { JWTAuthenticationGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(databaseConnection),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    },
    {
      provide: APP_GUARD,
      useClass: JWTAuthenticationGuard
    }
  ],
})
export class AppModule {}
