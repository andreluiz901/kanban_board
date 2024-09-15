import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Card } from 'src/domain/entities/card'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { CardsRepository } from 'src/domain/repositories/cards.repository'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'

interface ToogleCardCompleteUseCaseRequest {
  currentUserId: string
  cardId: string
}

type ToogleCardCompleteUseCaseResponse = null | {
  card: Card
}

@Injectable()
export class ToogleCardCompleteUseCase {
  constructor(
    private boardRepository: BoardsRepository,
    private cardRepository: CardsRepository,
    private collumnRepository: CollumnsRepository,
  ) {}

  async execute({
    currentUserId,
    cardId,
  }: ToogleCardCompleteUseCaseRequest): Promise<ToogleCardCompleteUseCaseResponse> {
    const card = await this.cardRepository.findById(cardId)

    if (!card) {
      throw new BadRequestException('Card not found!')
    }

    const collumn = await this.collumnRepository.findById(
      card.collumnId.toValue(),
    )

    const board = await this.boardRepository.findById(collumn.boardId.toValue())

    if (!board) {
      throw new BadRequestException('Board not found!')
    }

    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException(
        'User not allowed to create or edit this board',
      )
    }

    const cardToogleComplete = await this.cardRepository.toogleComplete(cardId)

    return { card: cardToogleComplete }
  }
}
