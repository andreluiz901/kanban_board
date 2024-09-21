import { ApiProperty } from '@nestjs/swagger'

export class UpdateCollumnOrderResponse200 {
  @ApiProperty()
  collumn: {
    id: string
    name: string
    order: number
    board_id: string
  }
}
