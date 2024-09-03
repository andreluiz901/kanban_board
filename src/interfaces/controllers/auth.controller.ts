import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/application/auth/decorators/public';
import { SignInDto } from 'src/application/auth/dto/sign-in.dto';
import { AuthService } from 'src/application/auth/use-cases/auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user
  }
}
