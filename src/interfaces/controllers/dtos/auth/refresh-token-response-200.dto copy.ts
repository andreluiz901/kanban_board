import { ApiProperty } from '@nestjs/swagger'

export class RefresTokenResponse200 {
  @ApiProperty()
  access_token: string

  @ApiProperty()
  refresh_token: string
}
