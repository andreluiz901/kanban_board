import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infrastructure/database/database.module'
import { CreateCardUseCase } from './use-cases/create-card.usecase'
import { CardsController } from 'src/interfaces/controllers/cards.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CardsController],
  providers: [CreateCardUseCase],
})
export class CardsModule {}
