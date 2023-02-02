import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Name should be between 3 and 20 chars' })
  @ApiProperty({
    description: 'the name',
    example: 'Paul',
  })
  public name: string;
}
