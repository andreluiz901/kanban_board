import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'email@email.com',
    description: 'An string with user email to login',
  })
  email: string

  @ApiProperty({
    example: 'senha@123',
    description: 'An string with user password to login',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
