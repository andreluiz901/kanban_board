import { Injectable } from "@nestjs/common"
import { Board } from "src/domain/entities/board"
import { UniqueEntityId } from "src/domain/entities/unique-entity-id"
import { BoardsRepository } from "src/domain/repositories/boards.repository"

interface CreateBoardUseCaseRequest {
  userId: string
  name: string
  description: string
}

type CreateBoardUseCaseResponse = null | {
  board: Board
}

@Injectable()
export class CreateBoardUseCase {

  constructor(private boardRepository: BoardsRepository) { }

  async execute({
    name,
    description,
    userId
  }: CreateBoardUseCaseRequest): Promise<CreateBoardUseCaseResponse> {

    const board = Board.create({
      name,
      description,
      userId: new UniqueEntityId(userId)
    })

    await this.boardRepository.create(board)

    return { board }
  }
}