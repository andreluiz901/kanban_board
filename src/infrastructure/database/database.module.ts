import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users.repository";
import { BoardsRepository } from "src/domain/repositories/boards.repository";
import { PrismaBoardRepository } from "./prisma/repositories/prisma-boards.repository";

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
    {
      provide: BoardsRepository,
      useClass: PrismaBoardRepository
    },
  ],
  exports: [PrismaService, UsersRepository, BoardsRepository]
})
export class DatabaseModule { }