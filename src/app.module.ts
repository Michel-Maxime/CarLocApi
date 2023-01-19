import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, CarsModule, StripeModule],
})
export class AppModule {}
