import type { User } from 'src/domain/entities/user'

export abstract class UsersRepository {
  abstract findByEmail(id: string): Promise<User | null>
  abstract create(user: User): Promise<void>
  abstract findAll(): Promise<User[]>
  abstract findById(id: string): Promise<User | null>
  abstract update(user: User): Promise<void>
  abstract delete(user: User): Promise<void>
}
