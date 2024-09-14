import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'
import { Collumn } from 'src/domain/entities/collumn'
import { PrismaCollumnMapper } from 'src/infrastructure/mappers/prisma-collumn.mapper'
import { CardsRepository } from 'src/domain/repositories/cards.repository'
import { Card } from 'src/domain/entities/card'
import { PrismaCardMapper } from 'src/infrastructure/mappers/prisma-card.mapper'

@Injectable()
export class PrismaCardRepository implements CardsRepository {
  constructor(private prisma: PrismaService) {}

  async create(card: Card): Promise<void> {
    const data = PrismaCardMapper.toPrisma(card)

    await this.prisma.card.create({
      data,
    })
  }

  async findById(cardId: string): Promise<Card | null> {
    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
    })

    if (!card) return null

    return await PrismaCardMapper.toDomain(card)
  }

  async delete(cardId: string): Promise<void> {
    await this.prisma.card.delete({
      where: { id: cardId },
    })
  }
}
