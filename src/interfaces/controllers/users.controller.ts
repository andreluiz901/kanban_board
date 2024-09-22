import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common'
import { UsersService } from '../../application/users/use-cases/users.service'
import { createUserSchema } from '../../application/users/schemas/create-user.schema'
import {
  UpdateUserDto,
  updateUserSchema,
} from '../../application/users/schemas/update-user.schema'
import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
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
import { ProfileParamDTO } from './dtos/user/profile-param.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly registerUser: RegisterUserUseCase,
    private readonly userProfile: UserProfileUseCase,
  ) {}

  @Public()
  @Post('signUp')
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: SignUpResponse201,
  })
  @ApiOperation({ summary: 'User successfully registered' })
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: signUpDTO) {
    const { email, username, password } = body

    const result = await this.registerUser.execute({
      username,
      email,
      password,
    })

    return { user: UserPresenter.toHTTP(result.user) }
  }

  // @Get()
  // async findAll() {
  //   const allusers = await this.usersService.findAll()

  //   return allusers.map((user) => {
  //     return {
  //       id: user.id.toValue(),
  //       email: user.email,
  //       username: user.username,
  //     }
  //   })
  // }

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

  @Patch(':id')
  async update(
    @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: UserPayload,
    @Param('id') id: string,
  ) {
    return await this.usersService.update(id, updateUserDto, currentUser.id)
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.usersService.remove(id, currentUser.id)
  }
}
