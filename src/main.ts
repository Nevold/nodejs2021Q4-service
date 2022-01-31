import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error'],
  });
  await app.listen(process.env.PORT, process.env.HTTP_ADDRESS, () =>
    console.log(`Server started on port:${process.env.PORT}`),
  );
}
bootstrap();
