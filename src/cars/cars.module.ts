import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import CarResponseBuilder from './car.response.builder';

@Module({
  controllers: [CarsController],
  providers: [CarsService, JwtStrategy, CarResponseBuilder],
})
export class CarsModule {}
