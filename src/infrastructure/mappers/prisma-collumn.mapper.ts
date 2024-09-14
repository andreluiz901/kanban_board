import { Prisma, Collumn as PrismaCollumn } from '@prisma/client'
import { Collumn } from 'src/domain/entities/collumn'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'

export class PrismaCollumnMapper {
  static toDomain(raw: PrismaCollumn): Collumn {
    return Collumn.create(
      {
        name: raw.name,
        boardId: new UniqueEntityId(raw.boardId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(board: Collumn): Prisma.CollumnUncheckedCreateInput {
    return {
      id: board.id.toValue(),
      name: board.name,
      boardId: board.boardId.toValue(),
    }
  }
}
