import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common'
import { UserPayload } from 'src/infrastructure/auth/user-payload'
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator'
import { CreateBoardUseCase } from 'src/application/board/use-cases/create-board.usecase'
import { RemoveBoardUseCase } from 'src/application/board/use-cases/delete-board.usecase'
import { EditBoardUseCase } from 'src/application/board/use-cases/edit-board.usecase'
import {
  CreateBoardBodySchema,
  createBoardBodyValidationPipe,
} from './schemas/board/update-board-body-schema'
import {
  UpdateBoardBodySchema,
  updateBoardBodyValidationPipe,
} from './schemas/board/create-board-body-schema'

@Controller('boards')
export class BoardController {
  constructor(
    private readonly createBoard: CreateBoardUseCase,
    private readonly removeBoard: RemoveBoardUseCase,
    private readonly updateBoard: EditBoardUseCase,
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

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to create board at this time, try again later.',
      )
    }

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

  @Patch(':id')
  async update(
    @Body(updateBoardBodyValidationPipe) {
      name,
      description,
    }: UpdateBoardBodySchema,
    @CurrentUser() currentUser: UserPayload,
    @Param('id') id: string,
  ) {
    const result = await this.updateBoard.execute({
      boardId: id,
      currentUserId: currentUser.id,
      description,
      name,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to update board at this time, try again later.',
      )
    }
  }
}
