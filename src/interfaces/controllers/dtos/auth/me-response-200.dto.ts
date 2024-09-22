import { ApiProperty } from '@nestjs/swagger'

export class MeResponse200 {
  @ApiProperty({ example: '7d9bc921-4d7d-45e4-9092-3ec16a0dcf96' })
  id: string

  @ApiProperty({ example: 'user02' })
  username: string

  @ApiProperty({ example: 'email@email.com' })
  email: string
}
