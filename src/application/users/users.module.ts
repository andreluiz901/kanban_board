import { Module } from '@nestjs/common';
import { UsersService } from './use-cases/users.service';
import { UsersController } from '../../interfaces/controllers/users.controller'
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { CryptoGraphyModule } from 'src/infrastructure/cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptoGraphyModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
