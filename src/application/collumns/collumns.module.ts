import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infrastructure/database/database.module'
import { CreateCollumnUseCase } from './use-cases/create-collumn.usecase'
import { CollumnController } from 'src/interfaces/controllers/collumns.controller'
import { RemoveCollumnUseCase } from './use-cases/delete-collumn.usecase'
import { EditCollumnUseCase } from './use-cases/edit-collumn.usecase'
import { UpdateCollumnOrderUseCase } from './use-cases/update-collumn-order'

@Module({
  imports: [DatabaseModule],
  controllers: [CollumnController],
  providers: [
    CreateCollumnUseCase,
    RemoveCollumnUseCase,
    EditCollumnUseCase,
    UpdateCollumnOrderUseCase,
  ],
})
export class CollumnsModule {}
