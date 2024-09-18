import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateBoardDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Items checklist',
    description: 'An string with the board name',
  })
  name: string

  @ApiProperty({
    example:
      'My travel pack list. Do not forget to check with everyone what items they will be taking',
    description: 'An string with the description of the board',
  })
  @IsString()
  description: string
}
