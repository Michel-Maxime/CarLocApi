import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  image: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsBoolean()
  isAvaible: boolean;
}
