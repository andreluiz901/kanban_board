import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashComparer } from 'src/cryptography/hash-comparer';
import { UsersRepository } from 'src/db/repositories/users.repository';

@Injectable()
export class AuthService {

  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException('User or Password Invalid')

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) throw new UnauthorizedException('User or Password Invalid')

    const payload = { id: user.id.toValue(), username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }
}
