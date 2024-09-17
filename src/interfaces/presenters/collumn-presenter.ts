import { Collumn } from 'src/domain/entities/collumn'

export class CollumnPresenter {
  static toHTTP(collumn: Collumn) {
    return {
      id: collumn.id.toValue(),
      name: collumn.name,
      order: collumn.order,
      board_id: collumn.boardId.toValue(),
    }
  }
}
