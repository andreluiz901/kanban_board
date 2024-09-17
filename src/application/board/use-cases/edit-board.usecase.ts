import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Board } from 'src/domain/entities/board'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'

interface EditBoardUseCaseRequest {
  boardId: string
  currentUserId: string
  name: string
  description: string
}

type EditBoardUseCaseResponse =
  | {
      board: Board
    }
  | BadRequestException
  | ForbiddenException

@Injectable()
export class EditBoardUseCase {
  constructor(private boardRepository: BoardsRepository) {}

  async execute({
    name,
    description,
    currentUserId,
    boardId,
  }: EditBoardUseCaseRequest): Promise<EditBoardUseCaseResponse> {
    if (!name && !description) {
      throw new BadRequestException(
        'Need to inform name or description to update',
      )
    }

    const board = await this.boardRepository.findById(boardId)

    if (!board) throw new BadRequestException('Board not found')

    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException('User not Allowed to edit this board')
    }

    const dataToUpdateBoard = Board.create(
      {
        name: name ?? board.name,
        description: description ?? board.description,
        userId: new UniqueEntityId(currentUserId),
      },
      new UniqueEntityId(board.id.toValue()),
    )

    const boardUpdated = await this.boardRepository.update(dataToUpdateBoard)

    return { board: dataToUpdateBoard }
  }
}
