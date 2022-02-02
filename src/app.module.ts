import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from 'nestjs-pino';
import { FastifyReply, FastifyRequest } from 'fastify';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/board.model';
import { Task } from './tasks/tasks.model';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { logger } from './logger/logger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
      serveRoot: '/file',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Board, Task],
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: true,
      migrations: ['./dist/migrations/**/*{.ts,.js}'],
    }),
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV === 'development'
          ? {
              logger,
              wrapSerializers: false,
              serializers: {
                req(request: FastifyRequest) {
                  return {
                    method: request.method,
                    url: request.url,
                    parameters: request.params,
                    body: request.body,
                  };
                },
                res(res: FastifyReply) {
                  return {
                    statusCode: res.statusCode,
                  };
                },
              },
            }
          : {},
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
