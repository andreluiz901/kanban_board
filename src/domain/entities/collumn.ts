import { Optional } from '../types/optional'
import { Entity } from './entity'
import type { UniqueEntityId } from './unique-entity-id'

export interface CollumnProps {
  name: string
  boardId: UniqueEntityId
  order: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Collumn extends Entity<CollumnProps> {
  get name() {
    return this.props.name
  }

  get boardId() {
    return this.props.boardId
  }

  get order() {
    return this.props.order
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set order(order: number) {
    this.props.order = order
    this.touch()
  }

  static create(
    props: Optional<CollumnProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const collumn = new Collumn(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return collumn
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
