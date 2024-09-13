import { Injectable } from '@nestjs/common'
import { User } from 'src/domain/entities/users'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'
import { UsersRepository } from 'src/domain/repositories/users.repository'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
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
        username: user.username,
      },
    })
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map((user) =>
      User.create(
        {
          email: user.email,
          username: user.username,
          password: user.password,
        },
        new UniqueEntityId(user.id),
      ),
    )
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) return null

    return User.create(user, new UniqueEntityId(user.id))
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id.toValue() },
      data: {
        id: user.id.toValue(),
        email: user.email,
        password: user.password,
        username: user.username,
      },
    })
  }

  async delete(user: User): Promise<void> {
    await this.prisma.user.delete({
      where: { id: user.id.toValue() },
    })
  }
}
