import { Injectable } from '@nestjs/common'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { PrismaService } from '../../prisma.service'
import type { Board } from 'src/domain/entities/board'
import { PrismaBoardMapper } from 'src/infrastructure/mappers/prisma-board.mapper'
import { BoardWithColumnsAndCardsDTO } from 'src/application/board/dto/board-with-collumn-and-card.dto'
import { PrismaCollumnMapper } from 'src/infrastructure/mappers/prisma-collumn.mapper'

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

  async update(board: Board): Promise<void> {
    const data = PrismaBoardMapper.toPrisma(board)

    await this.prisma.board.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
      },
    })
  }

  async findAllByUserId(userId: string): Promise<Board[] | null> {
    const foundBoards = await this.prisma.board.findMany({
      where: { userId },
    })

    if (foundBoards.length === 0) {
      return null
    }

    return foundBoards.map(PrismaBoardMapper.toDomain)
  }

  async fetchBoard(boardId: string): Promise<BoardWithColumnsAndCardsDTO> {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        Collumns: {
          include: { Cards: { orderBy: { order: 'asc' } } },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!board) {
      return null
    }

    return {
      id: board.id,
      name: board.name,
      description: board.description,
      userId: board.userId,
      collumns: board.Collumns.map((column) => ({
        id: column.id,
        name: column.name,
        boardId: column.boardId,
        order: column.order,
        cards: column.Cards.map((card) => ({
          id: card.id,
          name: card.name,
          description: card.description,
          order: card.order,
          isComplete: card.isComplete,
          collumnId: card.collumnId,
        })),
      })),
    }
  }
}
