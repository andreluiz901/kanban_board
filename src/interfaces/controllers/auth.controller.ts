import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Public } from 'src/application/auth/decorators/public'
import { AuthService } from 'src/application/auth/use-cases/auth.service'
import { SignInResponse200 } from './dtos/auth/sign-in-response-200.dto'
import { SignInDTO } from './dtos/auth/sign-in.dto'
import { MeResponse200 } from './dtos/auth/me-response-200.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description:
      'User successfully login on application. Returns an access token to bearer auth',
    type: SignInResponse200,
  })
  @ApiOperation({ summary: 'User successfully login on application' })
  @Post('signIn')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Fetch current user data',
    type: MeResponse200,
  })
  @ApiOperation({ summary: 'Get data of current user, using his auth token' })
  @Get('me')
  async getProfile(@Request() req) {
    return {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    }
  }
}
