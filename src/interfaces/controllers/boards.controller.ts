import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes } from '@nestjs/common';
import { UsersService } from '../../application/users/use-cases/users.service';
import { CreateUserDto, createUserSchema } from '../../application/users/schemas/create-user.schema';
import { UpdateUserDto, updateUserSchema } from '../../application/users/schemas/update-user.schema';
import { ZodValidationPipe } from 'src/interfaces/http/pipes/zod-validation.pipe';
import { Public } from 'src/application/auth/decorators/public';
import { UserPayload } from 'src/infrastructure/auth/user-payload';
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator';
import { CreateBoardUseCase } from 'src/application/board/use-cases/create-board.usecase';
import { z } from 'zod';

const createBoardBodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createBoardBodySchema)

type CreateBoardBodySchema = z.infer<typeof createBoardBodySchema>

@Controller('boards')
export class CreateBoardController {
  constructor(private readonly createBoard: CreateBoardUseCase) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateBoardBodySchema,
    @CurrentUser() user: UserPayload
  ) {

    const { name, description } = body

    const result = await this.createBoard.execute({
      name, description, userId: user.id
    })

    return `Board ${name} created successfully`
  }


}
