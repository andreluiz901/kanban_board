import { Entity } from './entity'
import type { UniqueEntityId } from './unique-entity-id'

export interface CardProps {
  name: string
  description: string
  isComplete: boolean
  collumnId: UniqueEntityId
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

  static create(props: CardProps, id?: UniqueEntityId) {
    const user = new Card(props, id)

    return user
  }
}
