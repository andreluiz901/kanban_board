import { Module } from '@nestjs/common'
import { UsersService } from './use-cases/users.service'
import { UsersController } from '../../interfaces/controllers/users.controller'
import { DatabaseModule } from 'src/infrastructure/database/database.module'
import { CryptoGraphyModule } from 'src/infrastructure/cryptography/cryptography.module'
import { RegisterUserUseCase } from './use-cases/register-user.usecase'
import { UserProfileUseCase } from './use-cases/user-profile.usecase'
import { UpdateUserUseCase } from './use-cases/update-user.usecase'
import { DeleteAccountUserUseCase } from './use-cases/delete-account-user'

@Module({
  imports: [DatabaseModule, CryptoGraphyModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    RegisterUserUseCase,
    UserProfileUseCase,
    UpdateUserUseCase,
    DeleteAccountUserUseCase,
  ],
})
export class UsersModule {}
