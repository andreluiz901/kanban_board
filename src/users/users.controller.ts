import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
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
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
