import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarDto {
  @IsString()
  @ApiProperty({
    description: 'The picture',
    example: 'https://...',
  })
  image: string;

  @IsString()
  @ApiProperty({
    description: 'The name',
    example: 'BMW série 1',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'the details',
    example: 'Omg VROUM VROUM do the car',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    description: 'the price',
    example: 12,
  })
  price: number;

  @IsBoolean()
  @ApiProperty({
    description: 'the disponibility',
    example: true,
  })
  isAvaible: boolean;
}
