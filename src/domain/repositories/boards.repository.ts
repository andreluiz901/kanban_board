import { BoardWithColumnsAndCardsDTO } from 'src/application/board/dto/board-with-collumn-and-card.dto'
import type { Board } from 'src/domain/entities/board'

export abstract class BoardsRepository {
  abstract create(board: Board): Promise<void>
  abstract findById(boardId: string): Promise<Board | null>
  abstract delete(boardId: string): Promise<void>
  abstract update(board: Board): Promise<void>
  abstract findAllByUserId(userId: string): Promise<Board[] | null>
  abstract fetchBoard(boardId: string): Promise<BoardWithColumnsAndCardsDTO>
}
