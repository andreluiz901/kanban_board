import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { UniqueEntityId } from 'src/domain/entities/unique-entity-id'
import { User } from 'src/domain/entities/user'
import { UsersRepository } from 'src/domain/repositories/users.repository'

type UserDataToUpdate = {
  email?: string
  username?: string
}

interface UpdateUserUseCaseRequest {
  data: UserDataToUpdate
  currentUserId: string
}

type UpdateUserUseCaseResponse = {
  userUpdated: User
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    data,
    currentUserId,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(currentUserId)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    if (data.email) {
      if (user.email === data.email) {
        throw new BadRequestException(
          'Please enter an email address different from your current email address.',
        )
      }

      const userWithSameEmail = await this.usersRepository.findByEmail(
        data.email,
      )

      if (userWithSameEmail) {
        throw new BadRequestException('Email already exists')
      }
    }

    const dataToUpdateUser = User.create(
      {
        email: data.email ?? user.email,
        username: data.username ?? user.username,
        password: user.password,
      },
      new UniqueEntityId(user.id.toValue()),
    )

    const userUpdated = await this.usersRepository.update(dataToUpdateUser)

    return { userUpdated }
  }
}
