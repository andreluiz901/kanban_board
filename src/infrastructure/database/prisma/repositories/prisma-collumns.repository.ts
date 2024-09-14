import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'
import { Collumn } from 'src/domain/entities/collumn'
import { PrismaCollumnMapper } from 'src/infrastructure/mappers/prisma-collumn.mapper'

@Injectable()
export class PrismaCollumnRepository implements CollumnsRepository {
  constructor(private prisma: PrismaService) {}

  async create(collumn: Collumn): Promise<void> {
    const data = PrismaCollumnMapper.toPrisma(collumn)

    await this.prisma.collumn.create({
      data,
    })
  }

  async findById(collumnId: string): Promise<Collumn | null> {
    const collumn = await this.prisma.collumn.findUnique({
      where: { id: collumnId },
    })

    if (!collumn) return null

    return await PrismaCollumnMapper.toDomain(collumn)
  }

  async delete(collumnId: string): Promise<void> {
    await this.prisma.collumn.delete({
      where: { id: collumnId },
    })
  }
}
