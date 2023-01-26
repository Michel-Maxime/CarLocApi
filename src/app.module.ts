import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { StripeModule } from './stripe/stripe.module';
import { CarResponseBuilderService } from './car-response-builder/car-response-builder.service';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, CarsModule, StripeModule],
  providers: [CarResponseBuilderService],
})
export class AppModule {}
