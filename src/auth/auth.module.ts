import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { DatabaseModule } from 'src/db/database.module';
import { CryptoGraphyModule } from 'src/cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptoGraphyModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: `${60 * 15}s` //15 min
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
