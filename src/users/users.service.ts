import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { PrismaUsersRepository } from 'src/db/prisma/repositories/prisma-users.repository';
import type { HashGenerator } from 'src/cryptography/hash-generator';
import type { User } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: PrismaUsersRepository,
    private hashGenerator: HashGenerator,
  ) { }

  async create({ id, email, username, password }: CreateUserDto) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) throw new BadRequestException('Email already exists')

    const hashedPassword = await this.hashGenerator.hash(password)

    const user: User = {
      id: randomUUID(),
      email,
      username,
      password: hashedPassword
    }

    await this.usersRepository.create(user)

    return user
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
