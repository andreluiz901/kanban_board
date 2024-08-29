import { Entity } from "./entity"
import type { UniqueEntityId } from "./unique-entity-id"

export interface UserProps {
  username: string
  email: string
  password: string
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

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id)

    return user
  }
}