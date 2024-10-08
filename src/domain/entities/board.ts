import { Optional } from '../types/optional'
import { Entity } from './entity'
import type { UniqueEntityId } from './unique-entity-id'

export interface BoardProps {
  name: string
  description: string
  userId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date | null
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

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<BoardProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new Board(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return user
  }
}
