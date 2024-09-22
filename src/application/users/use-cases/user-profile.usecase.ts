import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from 'src/domain/entities/user'
import { UsersRepository } from 'src/domain/repositories/users.repository'

interface UserProfileUseCaseRequest {
  userId: string
}

type UserProfileUseCaseResponse = null | {
  user: User
}

@Injectable()
export class UserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: UserProfileUseCaseRequest): Promise<UserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new BadRequestException('User not found')

    return { user }
  }
}
