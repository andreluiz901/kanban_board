import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'
import { DatabaseModule } from 'src/db/database.module';
import { CryptoGraphyModule } from 'src/cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptoGraphyModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
