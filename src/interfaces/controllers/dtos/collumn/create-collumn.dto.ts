import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCollumndDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Items checklist',
    description: 'An string with the collumn name',
  })
  name: string
}
