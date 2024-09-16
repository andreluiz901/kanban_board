import { Optional } from '../types/optional'
import { Entity } from './entity'
import type { UniqueEntityId } from './unique-entity-id'

export interface UserProps {
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get username() {
    return this.props.username
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return user
  }
}
