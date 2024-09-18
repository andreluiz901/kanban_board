import { ApiProperty } from '@nestjs/swagger'

export class CreateBoardResponse201 {
  @ApiProperty()
  board: {
    id: string
    name: string
    description: string
    user_id: string
  }
}
