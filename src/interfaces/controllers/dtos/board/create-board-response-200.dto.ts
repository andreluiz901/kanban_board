import { ApiProperty } from '@nestjs/swagger'

export class UpdateBoardResponse200 {
  @ApiProperty()
  board: {
    id: string
    name: string
    description: string
    user_id: string
  }
}
