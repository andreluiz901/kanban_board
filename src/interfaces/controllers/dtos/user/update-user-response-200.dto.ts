import { ApiProperty } from '@nestjs/swagger'

class UpdateUserResponse {
  @ApiProperty({
    example: '860c48a2-0a44-43a8-bfd2-c036df333f39',
  })
  id: string

  @ApiProperty({
    example: 'user001',
  })
  username: string

  @ApiProperty({
    example: 'email@email.com',
    description: 'An string with user password',
  })
  email: string
}

export class UpdateUserResponse200 {
  @ApiProperty()
  user: UpdateUserResponse
}
