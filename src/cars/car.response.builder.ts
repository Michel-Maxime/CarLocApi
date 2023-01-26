import { Car } from '@prisma/client';
import IResponseBuilder from '../utils/response.builder';
import CarVM from './vm/car.vm';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CarResponseBuilder
  implements IResponseBuilder<Car, CarVM>
{
  sendResponse(msg: string): { message: string } {
    return { message: msg };
  }
  sendItem(car: Car): CarVM {
    if (car == undefined) return new CarVM();

    return {
      id: car.id,
      ownerId: car.ownerId,
      image: car.image,
      name: car.name,
      description: car.description,
      price: car.price,
      isAvaible: car.isAvaible,
      createdAt: car.createdAt,
    } as CarVM;
  }
  sendItems(cars: Car[]): CarVM[] {
    let carsVM: CarVM[];

    if (cars == undefined) return carsVM;

    cars?.map((car) => {
      carsVM.push({
        id: car.id,
        ownerId: car.ownerId,
        image: car.image,
        name: car.name,
        description: car.description,
        price: car.price,
        isAvaible: car.isAvaible,
        createdAt: car.createdAt,
      } as CarVM);
    });

    return carsVM;
  }
}
