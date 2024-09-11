import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "src/domain/entities/users";
import { UsersRepository } from "src/domain/repositories/users.repository";
import { HashGenerator } from "src/application/cryptography/hash-generator";
import { UniqueEntityId } from "src/domain/entities/unique-entity-id";

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async create({ email, username, password }: CreateUserDto) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail)
      throw new BadRequestException("Email already exists");

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.usersRepository.findAll();

    return allUsers;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new BadRequestException("User not found");

    return user;
  }

  async update(id: string, data: UpdateUserDto, currentUserId: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new BadRequestException("User not found");

    if (user.id.toValue() !== currentUserId)
      throw new ForbiddenException("Not Allowed!");

    const dataToUpdateUser = User.create(
      {
        email: data.email ?? user.email,
        username: data.username ?? user.username,
        password: user.password,
      },
      new UniqueEntityId(user.id.toValue()),
    );

    const userUpdated = await this.usersRepository.update(dataToUpdateUser);

    return userUpdated;
  }

  async remove(id: string, currentUserId: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new BadRequestException("User not found");

    if (user.id.toValue() !== currentUserId)
      throw new ForbiddenException("Not Allowed!");

    return await this.usersRepository.delete(user);
  }
}
