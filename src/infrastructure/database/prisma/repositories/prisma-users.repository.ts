import { Injectable } from '@nestjs/common'
import { User } from 'src/domain/entities/user'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'
import { UsersRepository } from 'src/domain/repositories/users.repository'
import { PrismaService } from '../../prisma.service'
import { PrismaUserMapper } from 'src/infrastructure/mappers/prisma-user.mapper'

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
    const data = await PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return users.map(PrismaUserMapper.toDomain)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async update(user: User): Promise<User> {
    const data = await PrismaUserMapper.toPrisma(user)

    const userUpdated = await this.prisma.user.update({
      where: { id: data.id },
      data,
    })

    return await PrismaUserMapper.toDomain(userUpdated)
  }

  async delete(user: User): Promise<void> {
    await this.prisma.user.delete({
      where: { id: user.id.toValue() },
    })
  }
}
