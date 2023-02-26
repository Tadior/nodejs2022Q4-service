import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ExceptionFilter } from './exceptionFilter/exception.filter';
import { CustomLogger } from './logger/customLogger.service';

dotenv.config();
const port = process.env.PORT ? process.env.PORT : 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new CustomLogger());
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(port);
}
bootstrap();
