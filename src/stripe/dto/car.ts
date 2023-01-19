import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class Car {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  ownerId: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
