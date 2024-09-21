import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Collumn } from 'src/domain/entities/collumn'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'

interface UpdateCollumnOrderUseCaseRequest {
  currentUserId: string
  boardId: string
  collumnOrder: { id: string; order: number }[]
}

type UpdateCollumnOrderUseCaseResponse = null

@Injectable()
export class UpdateCollumnOrderUseCase {
  constructor(
    private boardRepository: BoardsRepository,
    private collumnRepository: CollumnsRepository,
  ) {}

  async execute({
    currentUserId,
    boardId,
    collumnOrder,
  }: UpdateCollumnOrderUseCaseRequest): Promise<UpdateCollumnOrderUseCaseResponse> {
    const board = await this.boardRepository.findById(boardId)

    if (!board) {
      throw new BadRequestException('Board not found!')
    }

    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException(
        'User not allowed to create or edit this board',
      )
    }

    const numberOfCollumnsOnBoard = await this.collumnRepository.countByBoardId(
      board.id.toValue(),
    )

    if (collumnOrder.length !== numberOfCollumnsOnBoard) {
      throw new BadRequestException('Error on counting board collumns!')
    }

    const dataToUpdate = []

    for await (const collumn of collumnOrder) {
      const foundCollumn = await this.collumnRepository.findById(collumn.id)

      if (!foundCollumn) {
        throw new BadRequestException('One or more collumns not found')
      }
      foundCollumn.order = collumn.order
      const updateOrderFoundCollumn = Collumn.create(
        foundCollumn,
        foundCollumn.id,
      )
    }

    console.log('dataToUpdate', dataToUpdate[0])
    await this.collumnRepository.updateOrder(collumnOrder)

    return null
  }
}
