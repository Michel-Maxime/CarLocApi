import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { stripeSecretKey } from '../utils/constants';
import { Car } from './dto/car';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    });
  }

  checkout(car: Car) {
    return this.stripe.paymentIntents.create({
      amount: car.price * 100, //cents
      currency: 'usd', // set currency,
      payment_method_types: ['card'],
    });
  }
}
