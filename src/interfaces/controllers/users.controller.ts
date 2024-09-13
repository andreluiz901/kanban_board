import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UsePipes,
} from '@nestjs/common'
import { UsersService } from '../../application/users/use-cases/users.service'
import {
  CreateUserDto,
  createUserSchema,
} from '../../application/users/schemas/create-user.schema'
import {
  UpdateUserDto,
  updateUserSchema,
} from '../../application/users/schemas/update-user.schema'
import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe'
import { Public } from 'src/application/auth/decorators/public'
import { UserPayload } from 'src/infrastructure/auth/user-payload'
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: CreateUserDto) {
    const { email, username, password } = body

    const result = await this.usersService.create({
      username,
      email,
      password,
    })

    return `User ${username} created successfully`
  }

  @Get()
  async findAll() {
    const allusers = await this.usersService.findAll()

    return allusers.map((user) => {
      return {
        id: user.id.toValue(),
        email: user.email,
        username: user.username,
      }
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id)

    return { id: user.id.toValue(), username: user.username, email: user.email }
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
