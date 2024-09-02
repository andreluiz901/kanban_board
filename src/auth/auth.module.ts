import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/db/database.module';
import { CryptoGraphyModule } from 'src/cryptography/cryptography.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
