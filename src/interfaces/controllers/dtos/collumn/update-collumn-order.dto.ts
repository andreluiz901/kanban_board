import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
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
      '[{"id": "1be77a42-ad88-4587-b4bc-fab9e4152013", order:0 }, {"id": "db61725a-01c9-44e0-a6b4-f1e3f6ece162", order:1 }, {"id": "db3c7c45-2db4-4886-9479-56f3680f7b4d", order:2 }]',
    description: 'An array with the new collumn order',
  })
  collumnOrder: CollumnOrderParam[]
}
