import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RefresTokenDTO {
  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({
  //   example:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4ZTR.......NCIsInVzZXJuYW1lIjoidXNlcjAwMSIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwiaWF0IjoxNzI3OTAzMTQ3LCJleHAiOjE3Mjc5MDQwNDd9.-YAxkLq_ssJ2DmSpYotq1GnNFd-OxKpVMeDheA1SNEI',
  //   description: 'An string with valid JWT',
  // })
  // access_token: string

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey............idXNlcjAwMSIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwiaWF0IjoxNzI3OTAzMTQ3LCJleHAiOjE3Mjc5MDQwNDd9.-YAxkLq_ssJ2DmSpYotq1GnNFd-OxKpVMeDheA1SNEI',
    description: 'An string with valid JWT',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string
}
