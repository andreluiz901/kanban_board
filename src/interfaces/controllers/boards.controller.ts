import { Controller, Post, Body, Delete, Param } from '@nestjs/common'
import { UserPayload } from 'src/infrastructure/auth/user-payload'
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator'
import { CreateBoardUseCase } from 'src/application/board/use-cases/create-board.usecase'
import {
  createBoardBodyValidationPipe,
  CreateBoardBodySchema,
} from './schemas/create-board-body-schema'
import { RemoveBoardUseCase } from 'src/application/board/use-cases/delete-board.usecase'

@Controller('boards')
export class BoardController {
  constructor(
    private readonly createBoard: CreateBoardUseCase,
    private readonly removeBoard: RemoveBoardUseCase,
  ) {}

  @Post()
  async create(
    @Body(createBoardBodyValidationPipe) body: CreateBoardBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, description } = body

    const result = await this.createBoard.execute({
      name,
      description,
      userId: user.id,
    })

    return `Board ${name} created successfully`
  }

  @Delete(':id')
  async remove(
    @Param('id') boardId: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.removeBoard.execute({
      boardId,
      currentUserId: currentUser.id,
    })
  }
}
