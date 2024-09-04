import { Entity } from "./entity"
import type { UniqueEntityId } from "./unique-entity-id"

export interface BoardProps {
  name: string
  description: string
  userId: UniqueEntityId
}

export class Board extends Entity<BoardProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get userId() {
    return this.props.userId
  }

  static create(props: BoardProps, id?: UniqueEntityId) {
    const user = new Board(props, id)

    return user
  }
}