import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { CardsRepository } from 'src/domain/repositories/cards.repository'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'

interface DeleteCardUseCaseRequest {
  currentUserId: string
  cardId: string
}

type DeleteCardUseCaseResponse = null | Error

@Injectable()
export class RemoveCardUseCase {
  constructor(
    private cardRepository: CardsRepository,
    private collumnRepository: CollumnsRepository,
    private boardRepository: BoardsRepository,
  ) {}

  async execute({
    currentUserId,
    cardId,
  }: DeleteCardUseCaseRequest): Promise<DeleteCardUseCaseResponse> {
    const card = await this.cardRepository.findById(cardId)

    if (!card) {
      throw new BadRequestException('Card not found!')
    }

    const collumn = await this.collumnRepository.findById(
      card.collumnId.toValue(),
    )

    const board = await this.boardRepository.findById(collumn.boardId.toValue())

    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException('User not Allowed to remove this card')
    }

    await this.cardRepository.delete(card.id.toValue())

    return null
  }
}
