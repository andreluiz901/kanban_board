import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Collumn } from 'src/domain/entities/collumn'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'

interface CreateCollumnUseCaseRequest {
  currentUserId: string
  boardId: string
  name: string
}

type CreateCollumnUseCaseResponse = null | {
  collumn: Collumn
}

@Injectable()
export class CreateCollumnUseCase {
  constructor(
    private boardRepository: BoardsRepository,
    private collumnRepository: CollumnsRepository,
  ) {}

  async execute({
    name,
    boardId,
    currentUserId,
  }: CreateCollumnUseCaseRequest): Promise<CreateCollumnUseCaseResponse> {
    const board = await this.boardRepository.findById(boardId)

    if (!board) {
      throw new BadRequestException('Board not found!')
    }

    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException(
        'User not allowed to create or edit this board',
      )
    }

    const lastCollumn = await this.collumnRepository.findLastCollumnByBoardId(
      board.id.toValue(),
    )

    const collumn = Collumn.create({
      name,
      boardId: new UniqueEntityId(boardId),
      order: lastCollumn ? lastCollumn.order + 1 : 0,
    })

    await this.collumnRepository.create(collumn)

    return { collumn }
  }
}
