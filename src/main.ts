import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  let app: INestApplication;
  process.env.USE_FASTIFY === 'true'
    ? (app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        {
          bufferLogs: true,
        },
      ))
    : (app = await NestFactory.create(AppModule, {
        bufferLogs: true,
      }));
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT, process.env.HTTP_ADDRESS, () =>
    console.log(`Server started on port: ${process.env.PORT}`),
  );
}
bootstrap();
