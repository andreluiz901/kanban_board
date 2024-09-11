import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { CreateBoardUseCase } from './use-cases/create-board.usecase';
import { CreateBoardController } from 'src/interfaces/controllers/boards.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateBoardController], providers: [CreateBoardUseCase],
})
export class BoardsModule { }
