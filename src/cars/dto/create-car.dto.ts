import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The id of the owner',
    example: 'b6bcff6c-98a2-11ed-a8fc-0242ac120002',
  })
  ownerId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The picture',
    example: 'https://...',
  })
  image: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name',
    example: 'BMW série 1',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'the details',
    example: 'Omg VROUM VROUM do the car',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'the price',
    example: 12,
  })
  price: number;
}
