import { ApiProperty } from '@nestjs/swagger'

class FetchCards {
  @ApiProperty({ example: 'b1cdcb53-75a7-48dd-b507-d5bf2364f40d' })
  id: string
  @ApiProperty({ example: 'Name_board' })
  name: string
  @ApiProperty({ example: 'description_board' })
  description: string
  @ApiProperty({ example: 0 })
  order: number
  @ApiProperty({ example: false })
  isComplete: boolean
  @ApiProperty({ example: '88e4dccf-6e70-45dd-ac72-0c4eb430e494' })
  collumn_id: string
}

class FetchColumns {
  @ApiProperty({ example: 'b1cdcb53-75a7-48dd-b507-d5bf2364f40d' })
  id: string
  @ApiProperty({ example: 'Name_board' })
  name: string
  @ApiProperty({ example: '88e4dccf-6e70-45dd-ac72-0c4eb430e494' })
  board_id: string
  @ApiProperty({ example: 0 })
  order: number
  @ApiProperty()
  cards: FetchCards[]
}

class FetchBoard {
  @ApiProperty({ example: 'b1cdcb53-75a7-48dd-b507-d5bf2364f40d' })
  id: string
  @ApiProperty({ example: 'Name_board' })
  name: string
  @ApiProperty({ example: 'description_board' })
  description: string
  @ApiProperty({ example: '88e4dccf-6e70-45dd-ac72-0c4eb430e494' })
  user_id: string
  @ApiProperty()
  collumns: FetchColumns[]
}

export class FetchBoardResponse200 {
  board: FetchBoard
}
