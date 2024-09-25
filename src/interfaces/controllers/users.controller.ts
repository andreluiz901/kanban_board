import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common'
import { Public } from 'src/application/auth/decorators/public'
import { UserPayload } from 'src/infrastructure/auth/user-payload'
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { RegisterUserUseCase } from 'src/application/users/use-cases/register-user.usecase'
import { UserPresenter } from '../presenters/user-presenter'
import { signUpDTO } from './dtos/user/sign-up.dto'
import { SignUpResponse201 } from './dtos/user/sign-up-response-201.dto'
import { UserProfileUseCase } from 'src/application/users/use-cases/user-profile.usecase'
import { UpdateUserUseCase } from 'src/application/users/use-cases/update-user.usecase'
import { UpdateUserDTO } from './dtos/user/update-user.dto'
import { UpdateUserResponse200 } from './dtos/user/update-user-response-200.dto'
import { DeleteAccountUserUseCase } from 'src/application/users/use-cases/delete-account-user'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly userProfile: UserProfileUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteAccountUser: DeleteAccountUserUseCase,
  ) {}

  @Public()
  @Post('signUp')
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: SignUpResponse201,
  })
  @ApiOperation({ summary: 'User successfully registered' })
  async create(@Body(new ValidationPipe()) body: signUpDTO) {
    const { email, username, password } = body

    const result = await this.registerUser.execute({
      username,
      email,
      password,
    })

    return { user: UserPresenter.toHTTP(result.user) }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Fetch user own data profile',
    type: SignUpResponse201,
  })
  @ApiOperation({ summary: 'Fetch user own data profile' })
  @Get('/profile')
  async profile(@CurrentUser() currentUser: UserPayload) {
    const { user } = await this.userProfile.execute({ userId: currentUser.id })

    return { user: UserPresenter.toHTTP(user) }
  }

  @Patch('/update')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UpdateUserResponse200,
  })
  @ApiOperation({ summary: 'User update his own profile name or email' })
  async update(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const { userUpdated } = await this.updateUser.execute({
      data: updateUserDto,
      currentUserId: currentUser.id,
    })

    return { user: UserPresenter.toHTTP(userUpdated) }
  }

  @Delete('delete')
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: 'User delete his own account' })
  async remove(@CurrentUser() currentUser: UserPayload) {
    return this.deleteAccountUser.execute({ userId: currentUser.id })
  }
}
