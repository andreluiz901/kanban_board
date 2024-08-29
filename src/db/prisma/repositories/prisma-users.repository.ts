import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UsersRepository } from "src/db/repositories/users.repository";
import { User } from "src/entities/users";
import { UniqueEntityId } from "src/entities/unique-entity-id";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string): Promise<User | null> {

    const user = await this.prisma.user.findUnique({
      where: {
        email
      },
    })

    if (!user) return null

    return User.create(user, new UniqueEntityId(user.id))
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id.toValue(),
        email: user.email,
        password: user.password,
        username: user.username
      }
    })
  }
}