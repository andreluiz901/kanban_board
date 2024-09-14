import type { Collumn } from 'src/domain/entities/collumn'

export abstract class CollumnsRepository {
  abstract create(board: Collumn): Promise<void>
  // abstract findById(boardId: string): Promise<Collumn | null>
  // abstract delete(boardId: string): Promise<void>
  // abstract update(board: Collumn): Promise<void>
}
