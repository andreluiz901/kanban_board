import { Prisma, Collumn as PrismaCollumn } from '@prisma/client'
import { Collumn } from 'src/domain/entities/collumn'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'

export class PrismaCollumnMapper {
  static toDomain(raw: PrismaCollumn): Collumn {
    return Collumn.create(
      {
        name: raw.name,
        boardId: new UniqueEntityId(raw.boardId),
        order: raw.order,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(collumn: Collumn): Prisma.CollumnUncheckedCreateInput {
    return {
      id: collumn.id.toValue(),
      name: collumn.name,
      boardId: collumn.boardId.toValue(),
      order: collumn.order,
    }
  }
}
