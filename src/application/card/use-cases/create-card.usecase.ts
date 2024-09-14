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

interface CreateCardUseCaseRequest {
  name: string
  description: string
  currentUserId: string
  collumnId: string
}

type CreateCardUseCaseResponse = null | {
  card: Card
}

@Injectable()
export class CreateCardUseCase {
  constructor(
    private boardRepository: BoardsRepository,
    private collumnRepository: CollumnsRepository,
    private cardRepository: CardsRepository,
  ) {}

  async execute({
    name,
    description,
    collumnId,
    currentUserId,
  }: CreateCardUseCaseRequest): Promise<CreateCardUseCaseResponse> {
    const collumn = await this.collumnRepository.findById(collumnId)

    if (!collumn) {
      throw new BadRequestException('collumn not found!')
    }

    const board = await this.boardRepository.findById(collumn.boardId.toValue())

    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException(
        'User not allowed to create or edit this board',
      )
    }

    const card = Card.create({
      name,
      description,
      isComplete: false,
      collumnId: new UniqueEntityId(collumnId),
    })

    await this.cardRepository.create(card)

    return { card }
  }
}
