import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './schemas/create-user.schema';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';
import { UpdateUserDto, updateUserSchema } from './schemas/update-user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: CreateUserDto) {

    const { email, username, password } = body

    const result = await this.usersService.create({
      username, email, password
    })

    return `User ${username} created successfully`
  }

  @Get()
  async findAll() {

    const allusers = await this.usersService.findAll();

    return allusers.map(user => {
      return {
        id: user.id.toValue(),
        email: user.email,
        username: user.username
      }
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    const user = await this.usersService.findOne(id);

    return { id: user.id.toValue(), username: user.username, email: user.email }
  }

  @Patch(':id')
  async update(
    @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
