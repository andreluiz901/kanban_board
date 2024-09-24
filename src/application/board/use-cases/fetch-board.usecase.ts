import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Board } from 'src/domain/entities/board'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { UsersRepository } from 'src/domain/repositories/users.repository'
import { BoardWithColumnsAndCardsDTO } from '../dto/board-with-collumn-and-card.dto'

interface FetchBoardUsecaseRequest {
  userId: string
  boardId: string
}

type FetchBoardUsecaseResponse = {
  board: BoardWithColumnsAndCardsDTO
}

@Injectable()
export class FetchBoardUsecase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly boardRepository: BoardsRepository,
  ) {}

  async execute({
    userId,
    boardId,
  }: FetchBoardUsecaseRequest): Promise<FetchBoardUsecaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new BadRequestException('User not Found!')
    }

    const board = await this.boardRepository.findById(boardId)

    if (!board) {
      throw new BadRequestException('Board not Found!')
    }

    if (userId !== board.userId.toValue()) {
      throw new ForbiddenException(
        'User not allowed to retrieve this board data!',
      )
    }

    const boardData = await this.boardRepository.fetchBoard(board.id.toValue())

    return { board: boardData }
  }
}
