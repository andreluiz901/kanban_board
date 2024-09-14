import { Entity } from './entity'
import type { UniqueEntityId } from './unique-entity-id'

export interface CollumnProps {
  name: string
  boardId: UniqueEntityId
}

export class Collumn extends Entity<CollumnProps> {
  get name() {
    return this.props.name
  }

  get boardId() {
    return this.props.boardId
  }

  static create(props: CollumnProps, id?: UniqueEntityId) {
    const user = new Collumn(props, id)

    return user
  }
}
