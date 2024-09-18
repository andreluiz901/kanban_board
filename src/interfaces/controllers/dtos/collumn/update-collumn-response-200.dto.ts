import { ApiProperty } from '@nestjs/swagger'

export class UpdateCollumnResponse200 {
  @ApiProperty()
  collumn: {
    id: string
    name: string
    order: number
    board_id: string
  }
}
