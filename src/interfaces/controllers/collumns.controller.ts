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
import { CreateCollumnUseCase } from 'src/application/collumns/use-cases/create-collumn.usecase'
import {
  CreateCollumnBodySchema,
  createCollumnBodyValidationPipe,
} from './schemas/collumns/create-collumn-body-schema'
import { RemoveCollumnUseCase } from 'src/application/collumns/use-cases/delete-collumn.usecase'
import { EditCollumnUseCase } from 'src/application/collumns/use-cases/edit-collumn.usecase'
import {
  UpdateCollumnBodySchema,
  updateCollumnBodyValidationPipe,
} from './schemas/collumns/update-collumn-body-schema'
import { CollumnPresenter } from '../presenters/collumn-presenter'

@Controller('collumns')
export class CollumnController {
  constructor(
    private readonly createCollumn: CreateCollumnUseCase,
    private readonly removeCollumn: RemoveCollumnUseCase,
    private readonly updateCollumn: EditCollumnUseCase,
  ) {}

  @Post()
  async create(
    @Body(createCollumnBodyValidationPipe) { name }: CreateCollumnBodySchema,
    @CurrentUser() currentUser: UserPayload,
    @Query('board_id') boardId: string,
  ) {
    if (!boardId) {
      throw new BadRequestException('Board Not Found!')
    }

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

    return { collumn: CollumnPresenter.toHTTP(result.collumn) }
  }

  @Delete(':id')
  async remove(
    @Param('id') collumnId: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.removeCollumn.execute({
      collumnId,
      currentUserId: currentUser.id,
    })
  }

  @Patch(':id')
  async update(
    @Body(updateCollumnBodyValidationPipe) { name }: UpdateCollumnBodySchema,
    @CurrentUser() currentUser: UserPayload,
    @Param('id') collumnId: string,
  ) {
    const result = await this.updateCollumn.execute({
      name,
      collumnId,
      currentUserId: currentUser.id,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to update collumn at this time, try again later.',
      )
    }
  }
}
