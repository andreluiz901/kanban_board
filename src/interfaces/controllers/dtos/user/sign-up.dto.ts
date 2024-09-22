import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class signUpDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'email@email.com',
    description: 'An string with user email',
  })
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'user001',
    description: 'An string with user username',
  })
  username: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'mySecretPassword@123',
    description: 'An string with user password',
  })
  password: string
}
