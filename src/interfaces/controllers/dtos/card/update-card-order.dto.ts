import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UpdateCardOrderDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 0 })
  oldCardOrder: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  newCardOrder: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  newCollumnId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  oldCollumnId: string
}
