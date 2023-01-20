import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class Car {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The id of the car',
    example: 'b6bcff6c-98a2-11ed-a8fc-0242ac120002',
  })
  id: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The id of the owner',
    example: 'b6bcff6c-98a2-11ed-a8fc-0242ac120002',
  })
  ownerId: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The price for location',
    example: '12',
  })
  price: number;
}
