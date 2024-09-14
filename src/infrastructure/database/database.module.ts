import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UsersRepository } from '../../domain/repositories/users.repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository'
import { BoardsRepository } from 'src/domain/repositories/boards.repository'
import { PrismaBoardRepository } from './prisma/repositories/prisma-boards.repository'
import { CollumnsRepository } from 'src/domain/repositories/collumns.repository'
import { PrismaCollumnRepository } from './prisma/repositories/prisma-collumns.repository'
import { CardsRepository } from 'src/domain/repositories/cards.repository'
import { PrismaCardRepository } from './prisma/repositories/prisma-card.repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: BoardsRepository,
      useClass: PrismaBoardRepository,
    },
    {
      provide: CollumnsRepository,
      useClass: PrismaCollumnRepository,
    },
    {
      provide: CardsRepository,
      useClass: PrismaCardRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    BoardsRepository,
    CollumnsRepository,
    CardsRepository,
  ],
})
export class DatabaseModule {}
