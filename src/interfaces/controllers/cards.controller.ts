import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
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

@Controller('cards')
export class CardsController {
  constructor(
    private readonly createCard: CreateCardUseCase,
    private readonly removeCard: RemoveCardUseCase,
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

    return `Card ${name} created successfully`
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
}
