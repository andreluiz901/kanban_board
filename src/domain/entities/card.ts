import { Optional } from '../types/optional'
import { Entity } from './entity'
import type { UniqueEntityId } from './unique-entity-id'

export interface CardProps {
  name: string
  description: string
  isComplete: boolean
  order: number
  collumnId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date | null
}

export class Card extends Entity<CardProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get isComplete() {
    return this.props.isComplete
  }

  get collumnId() {
    return this.props.collumnId
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

  static create(props: Optional<CardProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new Card(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return user
  }
}
