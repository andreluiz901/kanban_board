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

interface EditCardUseCaseRequest {
  currentUserId: string
  cardId: string
  name: string
  description: string
}

type EditCardUseCaseResponse = null | {
  card: Card
}

@Injectable()
export class EditCardUseCase {
  constructor(
    private boardRepository: BoardsRepository,
    private cardRepository: CardsRepository,
    private collumnRepository: CollumnsRepository,
  ) {}

  async execute({
    name,
    description,
    currentUserId,
    cardId,
  }: EditCardUseCaseRequest): Promise<EditCardUseCaseResponse> {
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

    const dataToUpdateCard = Card.create(
      {
        name: name ?? card.name,
        collumnId: new UniqueEntityId(collumn.id.toValue()),
        description: description ?? card.description,
        isComplete: card.isComplete,
        order: card.order,
      },
      new UniqueEntityId(cardId),
    )

    await this.cardRepository.update(dataToUpdateCard)

    return { card: dataToUpdateCard }
  }
}
