import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayContains,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

class CollumnOrderParam {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsNumber()
  order: number
}

export class UpdateCollumnOrderDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CollumnOrderParam)
  @ApiProperty({
    example:
      '[{id: abc-abc-abc-abc, order:0 }, {id: abc-abc-abc-abc, order:1 }, {id: abc-abc-abc-abc, order:2 }]',
    description: 'An array with the new collumn order',
  })
  collumnOrder: CollumnOrderParam[]
}
