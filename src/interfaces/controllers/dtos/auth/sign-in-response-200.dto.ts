import { ApiProperty } from '@nestjs/swagger'

export class SignInResponse200 {
  @ApiProperty()
  access_token: string
}
