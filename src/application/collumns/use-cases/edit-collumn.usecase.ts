import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Collumn } from 'src/domain/entities/collumn'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'

interface EditCollumnUseCaseRequest {
  currentUserId: string
  collumnId: string
  name: string
}

type EditCollumnUseCaseResponse = null | {
  collumn: Collumn
}

@Injectable()
export class EditCollumnUseCase {
  constructor(
    private boardRepository: BoardsRepository,
    private collumnRepository: CollumnsRepository,
  ) {}

  async execute({
    name,
    currentUserId,
    collumnId,
  }: EditCollumnUseCaseRequest): Promise<EditCollumnUseCaseResponse> {
    const collumn = await this.collumnRepository.findById(collumnId)

    if (!collumn) {
      throw new BadRequestException('Collumn not found!')
    }

    const board = await this.boardRepository.findById(collumn.boardId.toValue())

    if (!board) {
      throw new BadRequestException('Board not found!')
    }

    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException(
        'User not allowed to create or edit this board',
      )
    }

    const dataToUpdateCollumn = Collumn.create(
      {
        name,
        boardId: new UniqueEntityId(board.id.toValue()),
      },
      new UniqueEntityId(collumnId),
    )

    await this.collumnRepository.update(dataToUpdateCollumn)

    return { collumn: dataToUpdateCollumn }
  }
}
