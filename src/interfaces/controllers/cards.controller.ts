import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator'
import { UserPayload } from 'src/infrastructure/auth/user-payload'
import {
  CreateCardBodySchema,
  createCardBodyValidationPipe,
} from './schemas/card/create-card-body-schema'
import { CreateCardUseCase } from 'src/application/card/use-cases/create-card.usecase'
import { RemoveCardUseCase } from 'src/application/card/use-cases/delete-card.usecase'
import { EditCardUseCase } from 'src/application/card/use-cases/edit-card.usecase'
import {
  UpdateCardBodySchema,
  updateCardBodyValidationPipe,
} from './schemas/card/update-card-body-schema'
import { ToogleCardCompleteUseCase } from 'src/application/card/use-cases/toogle-card-complete.usecase'
import { CardPresenter } from '../presenters/card-presenter'
import { ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@Controller('cards')
export class CardsController {
  constructor(
    private readonly createCard: CreateCardUseCase,
    private readonly removeCard: RemoveCardUseCase,
    private readonly updateCard: EditCardUseCase,
    private readonly toogleCardComplete: ToogleCardCompleteUseCase,
  ) {}

  @Post()
  async create(
    @Body(createCardBodyValidationPipe) {
      name,
      description,
    }: CreateCardBodySchema,
    @CurrentUser() currentUser: UserPayload,
    @Query('collumn_id') collumnId: string,
  ) {
    if (!collumnId) {
      throw new BadRequestException('Collumn Not Found!')
    }

    const result = await this.createCard.execute({
      name,
      description,
      collumnId,
      currentUserId: currentUser.id,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to create card at this time, try again later.',
      )
    }

    return { card: CardPresenter.toHTTP(result.card) }
  }

  @Delete(':id')
  async remove(
    @Param('id') cardId: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.removeCard.execute({
      cardId,
      currentUserId: currentUser.id,
    })
  }

  @Patch(':id')
  async update(
    @Body(updateCardBodyValidationPipe) {
      name,
      description,
    }: UpdateCardBodySchema,
    @CurrentUser() currentUser: UserPayload,
    @Param('id') cardId: string,
  ) {
    const result = await this.updateCard.execute({
      name,
      description,
      cardId,
      currentUserId: currentUser.id,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to update collumn at this time, try again later.',
      )
    }
  }

  @Patch('complete/:id')
  async toogleComplete(
    @CurrentUser() currentUser: UserPayload,
    @Param('id') cardId: string,
  ) {
    const result = await this.toogleCardComplete.execute({
      cardId,
      currentUserId: currentUser.id,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to update collumn at this time, try again later.',
      )
    }
  }
}
