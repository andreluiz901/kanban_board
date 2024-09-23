import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { CardsRepository } from 'src/domain/repositories/cards.repository'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'

interface UpdateCardOrderUseCaseRequest {
  cardId: string
  oldCardOrder: number
  newCardOrder: number
  newCollumnId: string
  oldCollumnId: string
  currentUserId: string
}

type UpdateCardOrderUseCaseResponse = {
  null
}

@Injectable()
export class UpdateCardOrderUseCase {
  constructor(
    private cardRepository: CardsRepository,
    private collumnRepository: CollumnsRepository,
    private boardRepository: BoardsRepository,
  ) {}

  async execute({
    cardId,
    oldCardOrder,
    newCardOrder,
    newCollumnId,
    oldCollumnId,
    currentUserId,
  }: UpdateCardOrderUseCaseRequest): Promise<UpdateCardOrderUseCaseResponse> {
    const card = await this.cardRepository.findById(cardId)

    if (!card) {
      throw new BadRequestException(
        'Card not found or User not allowed to edit this card!',
      )
    }

    if (oldCollumnId !== card.collumnId.toValue()) {
      throw new BadRequestException(
        'Card not found or User not allowed to edit this card!',
      )
    }

    const collumn = await this.collumnRepository.findById(
      card.collumnId.toValue(),
    )
    if (!collumn) {
      throw new BadRequestException(
        'Collumn not found or User not allowed to edit this collumn!!',
      )
    }

    if (newCollumnId !== oldCollumnId) {
      const newCollumn = await this.collumnRepository.findById(newCollumnId)
      if (!newCollumn) {
        throw new BadRequestException(
          'Collumn not found or User not allowed to edit this collumn!!',
        )
      }
    }

    const board = await this.boardRepository.findById(collumn.boardId.toValue())
    if (!board) {
      throw new BadRequestException(
        'Board not found or User not allowed to edit this board!!',
      )
    }
    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException(
        'User not allowed to create or edit this board',
      )
    }

    const dataToUpdateCardOrder = {
      cardId,
      oldCardOrder,
      newCardOrder,
      oldCollumnId,
      newCollumnId,
    }

    await this.cardRepository.updateCardOrder(dataToUpdateCardOrder)

    return null
  }
}
