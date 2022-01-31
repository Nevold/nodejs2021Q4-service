import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/board.model';
import { Task } from './tasks/tasks.model';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
