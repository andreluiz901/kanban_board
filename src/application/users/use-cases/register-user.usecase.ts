import { BadRequestException, Injectable } from '@nestjs/common'
import { HashGenerator } from 'src/application/cryptography/hash-generator'
import { UsersRepository } from 'src/domain/repositories/users.repository'
import { User } from 'src/domain/entities/user'

interface registerUserUseCaseRequest {
  email: string
  username: string
  password: string
}

type registerUserUseCaseResponse = null | {
  user: User
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    username,
    password,
  }: registerUserUseCaseRequest): Promise<registerUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) throw new BadRequestException('Email already exists')

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      username,
      email,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return { user }
  }
}
