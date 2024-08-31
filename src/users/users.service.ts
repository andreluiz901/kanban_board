import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/users';
import { UsersRepository } from 'src/db/repositories/users.repository';
import { HashGenerator } from 'src/cryptography/hash-generator';
import { UniqueEntityId } from 'src/entities/unique-entity-id';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) { }

  async create({ email, username, password }: CreateUserDto) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) throw new BadRequestException('Email already exists')

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      username,
      email,
      password: hashedPassword
    })

    await this.usersRepository.create(user)

    return user
  }

  async findAll(): Promise<User[]> {

    const allUsers = await this.usersRepository.findAll()

    return allUsers

  }

  async findOne(id: string) {

    const user = await this.usersRepository.findById(id)

    if (!user) throw new BadRequestException(`User not found`)

    return user
  }

  async update(id: string, data: UpdateUserDto) {

    const user = await this.usersRepository.findById(id)

    if (!user) throw new BadRequestException(`User not found`)

    //TODO: when implements auth module with JWT, implements a verification to only owner update own profile

    const dataToUpdateUser = User.create({
      email: data.email ?? user.email,
      username: data.username ?? user.username,
      password: user.password
    }, new UniqueEntityId(user.id.toValue()))

    const userUpdated = await this.usersRepository.update(dataToUpdateUser)

    return userUpdated;
  }

  async remove(id: string) {

    const user = await this.usersRepository.findById(id)

    if (!user) throw new BadRequestException(`User not found`)

    //TODO: when implements auth module with JWT, implements a verification to only owner delete own profile

    return await this.usersRepository.delete(user)
  }
}
