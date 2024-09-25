import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator'
import { UserPayload } from 'src/infrastructure/auth/user-payload'
import { CreateCardUseCase } from 'src/application/card/use-cases/create-card.usecase'
import { RemoveCardUseCase } from 'src/application/card/use-cases/delete-card.usecase'
import { EditCardUseCase } from 'src/application/card/use-cases/edit-card.usecase'
import { ToogleCardCompleteUseCase } from 'src/application/card/use-cases/toogle-card-complete.usecase'
import { CardPresenter } from '../presenters/card-presenter'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateCardResponse201 } from './dtos/card/create-card-response-201.dto'
import { CreateCardDTO } from './dtos/card/create-card.dto'
import { UpdateCardResponse200 } from './dtos/card/update-card-response-200.dto'
import { UpdateCardDTO } from './dtos/card/update-card.dto'
import { UpdateCardOrderUseCase } from 'src/application/card/use-cases/update-card-order.usecase'
import { UpdateCardOrderDTO } from './dtos/card/update-card-order.dto'

@ApiBearerAuth()
@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(
    private readonly createCard: CreateCardUseCase,
    private readonly removeCard: RemoveCardUseCase,
    private readonly updateCard: EditCardUseCase,
    private readonly toogleCardComplete: ToogleCardCompleteUseCase,
    private readonly updateCardOrderUseCase: UpdateCardOrderUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Card successfully created',
    type: CreateCardResponse201,
  })
  @ApiOperation({ summary: 'User create a new card on his own board' })
  async create(
    @Body(new ValidationPipe()) { name, description }: CreateCardDTO,
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
  @HttpCode(204)
  @ApiOperation({ summary: 'User delete a card' })
  async remove(
    @Param('id') cardId: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.removeCard.execute({
      cardId,
      currentUserId: currentUser.id,
    })
  }

  @Patch('/update/:id')
  @ApiResponse({
    status: 200,
    description: 'Card successfully updated',
    type: UpdateCardResponse200,
  })
  @ApiOperation({ summary: 'User update his own card name or description' })
  async update(
    @Body(new ValidationPipe()) { name, description }: UpdateCardDTO,
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
  @HttpCode(204)
  @ApiOperation({
    summary: 'User toogle his own card as completed or not completed',
  })
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

  @Patch('/order/:card_id')
  async updateOrder(
    @CurrentUser() currentUser: UserPayload,
    @Body(new ValidationPipe()) {
      newCardOrder,
      newCollumnId,
      oldCardOrder,
      oldCollumnId,
    }: UpdateCardOrderDTO,
    @Param('card_id') cardId: string,
  ) {
    return this.updateCardOrderUseCase.execute({
      cardId,
      currentUserId: currentUser.id,
      newCardOrder,
      newCollumnId,
      oldCardOrder,
      oldCollumnId,
    })
  }
}
