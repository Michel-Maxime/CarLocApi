import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [CarsController],
  providers: [CarsService, JwtStrategy],
})
export class CarsModule {}
