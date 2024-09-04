import type { Board } from "src/domain/entities/board";

export abstract class BoardsRepository {
  abstract create(board: Board): Promise<void>
}