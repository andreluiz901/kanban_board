import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './application/users/users.module'
import { AuthModule } from './application/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './interfaces/http/guards/auth-guard'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'
import { BoardsModule } from './application/board/boards.module'
import { CollumnsModule } from './application/collumns/collumns.module'
import { CardsModule } from './application/card/cards.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BoardsModule,
    CollumnsModule,
    CardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 25,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
