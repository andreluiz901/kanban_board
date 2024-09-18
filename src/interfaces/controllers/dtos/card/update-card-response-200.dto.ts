import { ApiProperty } from '@nestjs/swagger'

class UpdateCardResponse {
  @ApiProperty({ example: 'b0141909-1a8c-4d96-ba8d-34ab64ee1f6a"' })
  id: string
  @ApiProperty({ example: 'My another important task to do' })
  name: string
  @ApiProperty({
    example: "This is an important task, don't forget to complete!",
  })
  description: string
  @ApiProperty({ example: false })
  is_complete: boolean
  @ApiProperty({ example: 0 })
  order: number
  @ApiProperty({ example: '78d83a94-d220-4ddb-b59b-d117173d112f' })
  collumn_id: string
}

export class UpdateCardResponse200 {
  @ApiProperty()
  card: UpdateCardResponse
}
