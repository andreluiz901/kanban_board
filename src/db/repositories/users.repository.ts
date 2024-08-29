import type { User } from "src/entities/users";

export abstract class UsersRepository {
  abstract findByEmail(id: string): Promise<User | null>
  abstract create(user: User): Promise<void>
}