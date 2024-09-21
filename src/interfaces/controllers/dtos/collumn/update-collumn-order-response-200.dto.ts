import { ApiProperty } from '@nestjs/swagger'

class UpdateCollumnResponse {
  @ApiProperty()
  id: '1be77a42-ad88-4587-b4bc-fab9e4152013'

  @ApiProperty()
  name: 'collumn1'

  @ApiProperty()
  order: 0

  @ApiProperty()
  board_id: '625f900d-340c-4d3e-acc0-cb2bf3c3d69c'
}

export class UpdateCollumnOrderResponse200 {
  @ApiProperty()
  data: UpdateCollumnResponse[]
}
