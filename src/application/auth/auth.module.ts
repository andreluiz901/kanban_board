import { Module } from '@nestjs/common'
import { AuthService } from './use-cases/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DatabaseModule } from 'src/infrastructure/database/database.module'
import { CryptoGraphyModule } from 'src/infrastructure/cryptography/cryptography.module'
import { AuthController } from 'src/interfaces/controllers/auth.controller'
import { CacheModule } from 'src/infrastructure/cache/cache.module'

@Module({
  imports: [
    DatabaseModule,
    CacheModule,
    CryptoGraphyModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: `${60 * 120}s`, //2 hrs
          },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
})
export class AuthModule {}
