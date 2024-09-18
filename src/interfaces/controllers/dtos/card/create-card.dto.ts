import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCardDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'My important task to do',
    description: 'An string with the card name',
  })
  name: string

  @ApiProperty({
    example: "This is an important task, don't forget to complete!",
    description: 'An string with the description of the card',
  })
  @IsString()
  description: string
}
