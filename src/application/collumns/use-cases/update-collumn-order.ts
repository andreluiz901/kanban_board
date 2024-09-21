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

type UpdateCollumnOrderUseCaseResponse = Collumn[]

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

    const dataToUpdate: Collumn[] = []
    let order = 0

    for (const collumn of collumnOrder) {
      if (collumn.order !== order) {
        throw new BadRequestException(
          'Please inform correct collumn order in ascending way, starting at 0: [0, 1, 2, 3...].',
        )
      }
      order++
      const foundCollumn = await this.collumnRepository.findById(collumn.id)

      if (foundCollumn.boardId.toValue() !== boardId) {
        throw new BadRequestException(
          'One or more collumns not match with the informed board to update order',
        )
      }

      if (!foundCollumn) {
        throw new BadRequestException('One or more collumns not found')
      }

      const updateOrderFoundCollumn = Collumn.create(
        {
          name: foundCollumn.name,
          boardId: foundCollumn.boardId,
          order: collumn.order,
          createdAt: foundCollumn.createdAt,
        },
        foundCollumn.id,
      )
      dataToUpdate.push(updateOrderFoundCollumn)
    }

    const result = await this.collumnRepository.updateOrder(dataToUpdate)

    return result
  }
}
