import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'

interface DeleteBoardUseCaseRequest {
  currentUserId: string
  boardId: string
}

type DeleteBoardUseCaseResponse = null | Error

@Injectable()
export class RemoveBoardUseCase {
  constructor(private boardRepository: BoardsRepository) {}

  async execute({
    currentUserId,
    boardId,
  }: DeleteBoardUseCaseRequest): Promise<DeleteBoardUseCaseResponse> {
    const board = await this.boardRepository.findById(boardId)

    if (!board) throw new BadRequestException('Board not found')

    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException('User not Allowed to remove this board')
    }

    await this.boardRepository.delete(board.id.toValue())

    return null
  }
}
