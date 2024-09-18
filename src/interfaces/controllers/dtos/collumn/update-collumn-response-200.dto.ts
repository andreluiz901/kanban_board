import { ApiProperty } from '@nestjs/swagger'

export class UpdateCollumnResponse200 {
  @ApiProperty()
  collumn: {
    id: string
    name: string
    board_id: string
  }
}
