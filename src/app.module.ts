import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, CarsModule],
})
export class AppModule {}
