import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { HashComparer } from 'src/application/cryptography/hash-comparer'
import { UsersRepository } from 'src/domain/repositories/users.repository'
import { UserPayload } from 'src/infrastructure/auth/user-payload'

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
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

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7 days',
      }),
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

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  }
}
