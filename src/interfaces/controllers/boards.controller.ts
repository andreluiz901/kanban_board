import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  BadRequestException,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common'
import { UserPayload } from 'src/infrastructure/auth/user-payload'
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator'
import { CreateBoardUseCase } from 'src/application/board/use-cases/create-board.usecase'
import { RemoveBoardUseCase } from 'src/application/board/use-cases/delete-board.usecase'
import { EditBoardUseCase } from 'src/application/board/use-cases/edit-board.usecase'
import { BoardPresenter } from '../presenters/board-presenter'
import { CreateBoardDTO } from './dtos/board/create-board.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UpdateBoardDTO } from './dtos/board/update-board.dto'
import { CreateBoardResponse201 } from './dtos/board/create-board-response-201.dto'
import { UpdateBoardResponse200 } from './dtos/board/update-board-response-200.dto'

@ApiBearerAuth()
@ApiTags('Boards')
@Controller('boards')
export class BoardController {
  constructor(
    private readonly createBoard: CreateBoardUseCase,
    private readonly removeBoard: RemoveBoardUseCase,
    private readonly updateBoard: EditBoardUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Board successfully created',
    type: CreateBoardResponse201,
  })
  @ApiOperation({ summary: 'User create a new board' })
  async create(
    @Body(new ValidationPipe()) body: CreateBoardDTO,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, description } = body

    const result = await this.createBoard.execute({
      name,
      description,
      userId: user.id,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to create board at this time, try again later.',
      )
    }

    return { board: BoardPresenter.toHTTP(result.board) }
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'User delete a board' })
  async remove(
    @Param('id') boardId: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.removeBoard.execute({
      boardId,
      currentUserId: currentUser.id,
    })
  }

  @Patch(':id')
  @ApiOperation({ summary: 'User update a board name or description' })
  @ApiResponse({
    status: 200,
    description: 'Board successfully updated',
    type: UpdateBoardResponse200,
  })
  async update(
    @Body(new ValidationPipe()) { name, description }: UpdateBoardDTO,
    @CurrentUser() currentUser: UserPayload,
    @Param('id') id: string,
  ) {
    const result = await this.updateBoard.execute({
      boardId: id,
      currentUserId: currentUser.id,
      description,
      name,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to update board at this time, try again later.',
      )
    }

    return { board: BoardPresenter.toHTTP(result.board) }
  }
}
