import {
  BadRequestException,
  Body,
  Controller,
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

@Controller('cards')
export class CardsController {
  constructor(private readonly createCard: CreateCardUseCase) {}

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
}
