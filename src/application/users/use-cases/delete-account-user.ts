import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/domain/repositories/users.repository'

interface DeleteAccountUserUseCaseRequest {
  userId: string
}

type DeleteAccountUserUseCaseResponse = {
  null
}

@Injectable()
export class DeleteAccountUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteAccountUserUseCaseRequest): Promise<DeleteAccountUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) throw new BadRequestException('User not found')

    await this.usersRepository.delete(user)

    return null
  }
}
