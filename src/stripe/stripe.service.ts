import { ForbiddenException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CarsService } from '../cars/cars.service';
import { stripeSecretKey } from '../utils/constants';
import { payInfos } from './dto/payInfos';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly _carService: CarsService) {
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    });
  }

  async checkout(carInfos: payInfos) {
    const car = await this._carService.findOne(carInfos.carId);

    if (!car.isAvaible) throw new ForbiddenException('Car is already rented');

    const response = await this.stripe.paymentIntents.create({
      amount: car.price * 100, //cents
      currency: 'usd', // set currency,
      payment_method_types: ['card'],
    });

    await this._carService.updateIsAvailbe(carInfos.carId, false);

    return response;
  }
}
