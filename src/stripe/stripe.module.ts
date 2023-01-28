import { Module } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  controllers: [StripeController],
  providers: [StripeService, CarsService],
})
export class StripeModule {}
