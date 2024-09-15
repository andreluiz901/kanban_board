import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infrastructure/database/database.module'
import { CreateCardUseCase } from './use-cases/create-card.usecase'
import { CardsController } from 'src/interfaces/controllers/cards.controller'
import { RemoveCardUseCase } from './use-cases/delete-card.usecase'
import { EditCardUseCase } from './use-cases/edit-card.usecase'
import { ToogleCardCompleteUseCase } from './use-cases/toogle-card-complete.usecase'

@Module({
  imports: [DatabaseModule],
  controllers: [CardsController],
  providers: [
    CreateCardUseCase,
    RemoveCardUseCase,
    EditCardUseCase,
    ToogleCardCompleteUseCase,
  ],
})
export class CardsModule {}
