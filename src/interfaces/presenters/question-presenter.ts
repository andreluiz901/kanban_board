import { Board } from '@prisma/client'

export class BoardPresenter {
  static toHTTP(board: Board) {
    return {
      id: board.id,
      name: board.name,
      description: board.description,
      user_id: board.userId,
    }
  }
}
