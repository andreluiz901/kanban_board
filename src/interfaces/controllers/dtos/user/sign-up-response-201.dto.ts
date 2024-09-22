import { ApiProperty } from '@nestjs/swagger'

class signUpResponse {
  @ApiProperty({
    example: 'email@email.com',
  })
  id: string

  @ApiProperty({
    example: 'user001',
  })
  username: string

  @ApiProperty({
    example: 'mySecretPassword@123',
    description: 'An string with user password',
  })
  email: string
}

export class signUpResponse201 {
  @ApiProperty()
  user: signUpResponse
}
