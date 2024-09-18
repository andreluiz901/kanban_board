import { ApiProperty } from '@nestjs/swagger'

export class CreateCollumnResponse201 {
  @ApiProperty()
  collumn: {
    id: string
    name: string
    board_id: string
  }
}
