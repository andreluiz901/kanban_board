import { Injectable } from "@nestjs/common";
import type { PrismaService } from "../prisma.service";
import type { User } from "@prisma/client";

@Injectable()
export class PrismaUsersRepository {
  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string): Promise<User | null> {

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) return null

    return user
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        username: user.username
      }
    })
  }
}