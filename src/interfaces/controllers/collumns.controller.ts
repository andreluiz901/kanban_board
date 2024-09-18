import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  BadRequestException,
  Query,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common'
import { UserPayload } from 'src/infrastructure/auth/user-payload'
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator'
import { CreateCollumnUseCase } from 'src/application/collumns/use-cases/create-collumn.usecase'
import { RemoveCollumnUseCase } from 'src/application/collumns/use-cases/delete-collumn.usecase'
import { EditCollumnUseCase } from 'src/application/collumns/use-cases/edit-collumn.usecase'
import { CollumnPresenter } from '../presenters/collumn-presenter'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateCollumnResponse201 } from './dtos/collumn/create-collumn-response-201.dto'
import { CreateCollumndDTO } from './dtos/collumn/create-collumn.dto'
import { UpdateCollumnResponse200 } from './dtos/collumn/update-collumn-response-200.dto'
import { UpdateCollumnDTO } from './dtos/collumn/update-collumn.dto'

@ApiBearerAuth()
@ApiTags('Collumns')
@Controller('collumns')
export class CollumnController {
  constructor(
    private readonly createCollumn: CreateCollumnUseCase,
    private readonly removeCollumn: RemoveCollumnUseCase,
    private readonly updateCollumn: EditCollumnUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Collumn successfully created',
    type: CreateCollumnResponse201,
  })
  @ApiOperation({ summary: 'User create a new collumn on his own board' })
  async create(
    @Body(new ValidationPipe()) { name }: CreateCollumndDTO,
    @CurrentUser() currentUser: UserPayload,
    @Query('board_id') boardId: string,
  ) {
    if (!boardId) {
      throw new BadRequestException('Board Not Found!')
    }

    const result = await this.createCollumn.execute({
      name,
      boardId,
      currentUserId: currentUser.id,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to create board at this time, try again later.',
      )
    }

    return { collumn: CollumnPresenter.toHTTP(result.collumn) }
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'User delete a collumn' })
  async remove(
    @Param('id') collumnId: string,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.removeCollumn.execute({
      collumnId,
      currentUserId: currentUser.id,
    })
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Collumn successfully updated',
    type: UpdateCollumnResponse200,
  })
  @ApiOperation({ summary: 'User update his own collumn name' })
  async update(
    @Body(new ValidationPipe()) { name }: UpdateCollumnDTO,
    @CurrentUser() currentUser: UserPayload,
    @Param('id') collumnId: string,
  ) {
    const result = await this.updateCollumn.execute({
      name,
      collumnId,
      currentUserId: currentUser.id,
    })

    if (!result) {
      throw new BadRequestException(
        'Sorry, its not possible to update collumn at this time, try again later.',
      )
    }
  }
}
