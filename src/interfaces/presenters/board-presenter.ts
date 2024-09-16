import { Board } from 'src/domain/entities/board'

export class BoardPresenter {
  static toHTTP(board: Board) {
    return {
      id: board.id.toValue(),
      name: board.name,
      description: board.description,
      user_id: board.userId.toValue(),
    }
  }
}
