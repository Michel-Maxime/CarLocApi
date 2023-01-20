import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsEmail()
  @ApiProperty({
    description: 'the email',
    example: 'email@gmail.com',
  })
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password should be between 3 and 20 chars' })
  @ApiProperty({
    description: 'the password',
    example: 'password',
  })
  public password: string;
}
