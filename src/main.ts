import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.flushLogs();
  await app.listen(process.env.PORT, process.env.HTTP_ADDRESS, () =>
    console.log(`Server started on port:${process.env.PORT}`),
  );
}
bootstrap();
