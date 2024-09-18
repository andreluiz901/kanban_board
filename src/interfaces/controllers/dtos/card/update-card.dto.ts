import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateCardDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'My another important task to do',
    description: 'An string with the collumn name',
  })
  name: string

  @ApiProperty({
    example: "This is an important task, don't forget to complete!",
    description: 'An string with the description of the card',
  })
  @IsString()
  description: string
}
