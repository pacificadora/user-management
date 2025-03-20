import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
const crypto = require('crypto');
global.crypto = crypto;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
