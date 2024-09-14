import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'

interface DeleteCollumnUseCaseRequest {
  currentUserId: string
  collumnId: string
}

type DeleteCollumnUseCaseResponse = null | Error

@Injectable()
export class RemoveCollumnUseCase {
  constructor(
    private collumnRepository: CollumnsRepository,
    private boardRepository: BoardsRepository,
  ) {}

  async execute({
    currentUserId,
    collumnId,
  }: DeleteCollumnUseCaseRequest): Promise<DeleteCollumnUseCaseResponse> {
    const collumn = await this.collumnRepository.findById(collumnId)

    if (!collumn) throw new BadRequestException('Collumn not found')

    const board = await this.boardRepository.findById(collumn.boardId.toValue())

    if (board.userId.toValue() !== currentUserId) {
      throw new ForbiddenException('User not Allowed to remove this collumn')
    }

    await this.collumnRepository.delete(collumn.id.toValue())

    return null
  }
}
