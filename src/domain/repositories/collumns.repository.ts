import type { Collumn } from 'src/domain/entities/collumn'

export abstract class CollumnsRepository {
  abstract create(collumn: Collumn): Promise<void>
  abstract findById(collumnId: string): Promise<Collumn | null>
  abstract delete(collumnId: string): Promise<void>
  abstract update(collumn: Collumn): Promise<void>
  abstract findLastCollumnByBoardId(boardId: string): Promise<Collumn | null>
  abstract updateOrder(collumnsToUpdate: Collumn[]): Promise<Collumn[] | null>
  abstract countByBoardId(boardId: string): Promise<number | null>
}
