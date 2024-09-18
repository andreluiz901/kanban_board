import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateCollumnDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Items checklist',
    description: 'An string with the collumn name',
  })
  name: string
}
