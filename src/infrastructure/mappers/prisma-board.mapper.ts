import { Prisma, Board as PrismaBoard } from "@prisma/client";
import { Board } from "src/domain/entities/board";
import { UniqueEntityId } from "src/domain/entities/unique-entity-id";

export class PrismaBoardMapper {
  static toDomain(raw: PrismaBoard): Board {
    return Board.create(
      {
        name: raw.name,
        description: raw.description,
        userId: new UniqueEntityId(raw.userId),
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(board: Board): Prisma.BoardUncheckedCreateInput {
    return {
      id: board.id.toValue(),
      name: board.name,
      description: board.description,
      userId: board.userId.toValue(),
    };
  }
}
