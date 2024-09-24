import { ApiProperty } from '@nestjs/swagger'

class FetchAllOwnBoards {
  @ApiProperty({ example: 'b1cdcb53-75a7-48dd-b507-d5bf2364f40d' })
  id: string
  @ApiProperty({ example: 'Name_board' })
  name: string
  @ApiProperty({ example: 'description_board' })
  description: string
  @ApiProperty({ example: '88e4dccf-6e70-45dd-ac72-0c4eb430e494' })
  user_id: string
}

export class FetchAllOwnBoardsResponse200 {
  boards: FetchAllOwnBoards[]
}
