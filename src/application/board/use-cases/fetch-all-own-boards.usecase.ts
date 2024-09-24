import { Injectable } from '@nestjs/common'
import { Board } from 'src/domain/entities/board'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'

interface FetchAllOwnBoardsUseCaseRequest {
  userId: string
}

type FetchAllOwnBoardsUseCaseresponse = { boards: Board[] }

@Injectable()
export class FetchAllOwnBoardsUseCase {
  constructor(private readonly boardRepository: BoardsRepository) {}

  async execute({
    userId,
  }: FetchAllOwnBoardsUseCaseRequest): Promise<FetchAllOwnBoardsUseCaseresponse> {
    const boards = await this.boardRepository.findAllByUserId(userId)
    return { boards }
  }
}
