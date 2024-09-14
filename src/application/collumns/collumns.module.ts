import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infrastructure/database/database.module'
import { CreateCollumnUseCase } from './use-cases/create-collumn.usecase'
import { CollumnController } from 'src/interfaces/controllers/collumns.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CollumnController],
  providers: [CreateCollumnUseCase],
})
export class CollumnsModule {}
