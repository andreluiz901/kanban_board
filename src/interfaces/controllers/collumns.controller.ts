import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  BadRequestException,
  Query,
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
import { CreateCollumnUseCase } from 'src/application/collumns/use-cases/create-collumn.usecase'
import {
  CreateCollumnBodySchema,
  createCollumnBodyValidationPipe,
} from './schemas/collumns/create-collumn-body-schema'

@Controller('collumns')
export class CollumnController {
  constructor(private readonly createCollumn: CreateCollumnUseCase) {}

  @Post()
  async create(
    @Body(createCollumnBodyValidationPipe) body: CreateCollumnBodySchema,
    @CurrentUser() currentUser: UserPayload,
    @Query('board_id') boardId: string,
  ) {
    const { name } = body

    const result = await this.createCollumn.execute({
      name,
      boardId,
      currentUserId: currentUser.id,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to create board at this time, try again later.',
      )
    }

    return `Collumn ${name} created successfully`
  }
}
