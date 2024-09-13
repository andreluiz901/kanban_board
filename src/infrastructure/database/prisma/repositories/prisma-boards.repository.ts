import { Injectable } from '@nestjs/common'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { PrismaService } from '../../prisma.service'
import type { Board } from 'src/domain/entities/board'
import { PrismaBoardMapper } from 'src/infrastructure/mappers/prisma-board.mapper'

@Injectable()
export class PrismaBoardRepository implements BoardsRepository {
  constructor(private prisma: PrismaService) {}

  async create(board: Board): Promise<void> {
    const data = PrismaBoardMapper.toPrisma(board)

    await this.prisma.board.create({
      data,
    })
  }

  async findById(boardId: string): Promise<Board | null> {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    })

    if (!board) return null

    return await PrismaBoardMapper.toDomain(board)
  }

  async delete(boardId: string): Promise<void> {
    await this.prisma.board.delete({
      where: { id: boardId },
    })
  }
}
