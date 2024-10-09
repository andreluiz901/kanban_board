import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { HashComparer } from 'src/application/cryptography/hash-comparer'
import { UsersRepository } from 'src/domain/repositories/users.repository'
import { UserPayload } from 'src/infrastructure/auth/user-payload'
import { CacheRepository } from 'src/infrastructure/cache/cache-repository'

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private cacheRepository: CacheRepository,
    private hashComparer: HashComparer,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<
    { access_token: string; refresh_token: string } | UnauthorizedException
  > {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new UnauthorizedException('User or Password Invalid')

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid)
      throw new UnauthorizedException('User or Password Invalid')

    const payload = {
      id: user.id.toValue(),
      username: user.username,
      email: user.email,
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7 days',
    })

    const ttlCacheOnSeconds = 604800 // 7 days on seconds ( 60 * 60 * 24 * 7 )

    await this.cacheRepository.set(
      `session:${user.id.toValue()}`,
      refreshToken,
      ttlCacheOnSeconds,
    )

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<
    { accessToken: string; refreshToken: string } | UnauthorizedException
  > {
    const refreshTokenPayload: UserPayload = await this.jwtService
      .verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })
      .catch((err) => {
        throw new UnauthorizedException('Not Authorized')
      })

    const cacheRefreshToken = await this.cacheRepository.get(
      `session:${refreshTokenPayload.id}`,
    )

    if (!cacheRefreshToken) {
      throw new UnauthorizedException('Not Authorized')
    }

    const payload = {
      id: refreshTokenPayload.id,
      username: refreshTokenPayload.username,
      email: refreshTokenPayload.email,
    }

    const newAccessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    })

    const newRefreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7 days',
    })

    const ttlCacheOnSeconds = 604800 // 7 days on seconds ( 60 * 60 * 24 * 7 )

    await this.cacheRepository.set(
      `session:${refreshTokenPayload.id}`,
      newRefreshToken,
      ttlCacheOnSeconds,
    )

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  }
}
