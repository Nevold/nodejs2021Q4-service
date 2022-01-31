import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './board.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BoardsService],
  controllers: [BoardsController],
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
})
export class BoardsModule {}
