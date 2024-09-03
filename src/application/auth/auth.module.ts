import { Module } from '@nestjs/common';
import { AuthService } from './use-cases/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { CryptoGraphyModule } from 'src/infrastructure/cryptography/cryptography.module';
import { AuthController } from 'src/interfaces/controllers/auth.controller';

@Module({
  imports: [DatabaseModule, CryptoGraphyModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {

        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: `${60 * 15}s` //15 min
          }
        }

      },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService]
})
export class AuthModule { }
