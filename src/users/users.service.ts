import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/users';
import { UsersRepository } from 'src/db/repositories/users.repository';
import { HashGenerator } from 'src/cryptography/hash-generator';

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
