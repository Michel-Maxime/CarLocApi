import { Body, Controller, Post } from '@nestjs/common';
import { Car } from './dto/car';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly _stripeService: StripeService) {}

  @Post()
  checkout(@Body() body: { car: Car }) {
    try {
      return this._stripeService.checkout(body.car);
    } catch (error) {
      return error;
    }
  }
}
