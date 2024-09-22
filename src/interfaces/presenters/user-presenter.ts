import { User } from 'src/domain/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toValue(),
      username: user.username,
      email: user.email,
    }
  }
}
