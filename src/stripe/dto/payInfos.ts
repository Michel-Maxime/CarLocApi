import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class payInfos {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The id of the car',
    example: 'b6bcff6c-98a2-11ed-a8fc-0242ac120002',
  })
  carId: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The id of the owner',
    example: 'b6bcff6c-98a2-11ed-a8fc-0242ac120002',
  })
  ownerId: string;
}
