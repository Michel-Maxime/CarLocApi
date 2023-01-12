import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  ownerId: string;
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
