import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CacheRepository } from './cache-repository'
import { RedisService } from './redis/redis.service'
import { RedisCacheRepository } from './redis-cache-repository'

@Module({
  imports: [],
  providers: [
    ConfigService,
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
