import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../../stripe/dto/car';

export class User {
  @ApiProperty({
    description: 'The id of the user',
    example: 'b6bcff6c-98a2-11ed-a8fc-0242ac120002',
  })
  id: string;
  @ApiProperty({
    description: 'The email of the user',
    example: 'email@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'The creation date of the user',
    example: '2023-01-19T08:54:07.371Z',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'The update date of the user',
    example: '2023-01-19T08:56:07.371Z',
  })
  updatedAt: Date;
  @ApiProperty({
    description: 'The car offer of the user',
    type: [Car],
  })
  cars: Car[];
}
