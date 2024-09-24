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
  Get,
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
import { FetchAllOwnBoardsUseCase } from 'src/application/board/use-cases/fetch-all-own-boards.usecase'
import { FetchAllOwnBoardsResponse200 } from './dtos/board/fetch-all-own-boards-response-200.dto'
import { FetchBoardUsecase } from 'src/application/board/use-cases/fetch-board.usecase'
import { FetchBoardResponse200 } from './dtos/board/fetch-board-response-200.dto'

@ApiBearerAuth()
@ApiTags('Boards')
@Controller('boards')
export class BoardController {
  constructor(
    private readonly createBoard: CreateBoardUseCase,
    private readonly removeBoard: RemoveBoardUseCase,
    private readonly updateBoard: EditBoardUseCase,
    private readonly fetchAllOwnBoardsUseCase: FetchAllOwnBoardsUseCase,
    private readonly fetchBoardUsecase: FetchBoardUsecase,
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

  @Get('/fetch/all')
  @ApiOperation({ summary: 'User fetch all your own boards' })
  @ApiResponse({
    status: 200,
    description: 'User fetch all your own boards',
    type: FetchAllOwnBoardsResponse200,
  })
  async fetchAllOwnBoards(@CurrentUser() currentUser: UserPayload) {
    const { boards } = await this.fetchAllOwnBoardsUseCase.execute({
      userId: currentUser.id,
    })
    return { boards: boards.map(BoardPresenter.toHTTP) }
  }

  @Get('/fetch/board/:board_id')
  @ApiOperation({ summary: 'User fetch one your own board detail' })
  @ApiResponse({
    status: 200,
    description: 'User fetch one your own board detail',
    type: FetchBoardResponse200,
  })
  async fetchBoard(
    @Param('board_id') boardId: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const board = await this.fetchBoardUsecase.execute({
      boardId,
      userId: currentUser.id,
    })

    return board
  }
}
