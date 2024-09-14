import { Prisma, Card as PrismaCard } from '@prisma/client'
import { Card } from 'src/domain/entities/card'
import { Collumn } from 'src/domain/entities/collumn'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'

export class PrismaCardMapper {
  static toDomain(raw: PrismaCard): Card {
    return Card.create(
      {
        name: raw.name,
        collumnId: new UniqueEntityId(raw.collumnId),
        description: raw.description,
        isComplete: raw.isComplete,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(card: Card): Prisma.CardUncheckedCreateInput {
    return {
      id: card.id.toValue(),
      name: card.name,
      collumnId: card.collumnId.toValue(),
      description: card.description,
      isComplete: card.isComplete,
    }
  }
}
