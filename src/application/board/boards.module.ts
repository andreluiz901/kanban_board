import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infrastructure/database/database.module'
import { CreateBoardUseCase } from './use-cases/create-board.usecase'
import { BoardController } from 'src/interfaces/controllers/boards.controller'
import { RemoveBoardUseCase } from './use-cases/delete-board.usecase'
import { EditBoardUseCase } from './use-cases/edit-board.usecase'
import { FetchAllOwnBoardsUseCase } from './use-cases/fetch-all-own-boards.usecase'

@Module({
  imports: [DatabaseModule],
  controllers: [BoardController],
  providers: [
    CreateBoardUseCase,
    RemoveBoardUseCase,
    EditBoardUseCase,
    FetchAllOwnBoardsUseCase,
  ],
})
export class BoardsModule {}
