import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost', 'http://127.0.0.1', process.env.FRONTEND_URL],
  });
  const port = process.env.PORT || 3000;

  const logger = new Logger(bootstrap.name);
  await app.listen(port);
  logger.log(`Server started at http://localhost:${port}`);
}
bootstrap();
