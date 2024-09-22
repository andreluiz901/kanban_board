import { ApiProperty } from '@nestjs/swagger'

export class ProfileParamDTO {
  @ApiProperty({
    example: '860c48a2-0a44-43a8-bfd2-c036df333f39',
  })
  userId: string
}
