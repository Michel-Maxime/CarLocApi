import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Request } from 'express';

@Injectable()
export class CarsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createCarDto: CreateCarDto): Promise<void> {
    const { ownerId, image, name, description, price } = createCarDto;

    await this._prisma.car.create({
      data: {
        ownerId: ownerId,
        image: image,
        name: name,
        description: description,
        price: price,
      },
    });
  }

  async findAll(req: Request) {
    const decodedUser = req.user as { id: string; email: string };

    const cars = await this._prisma.car.findMany({
      where: { NOT: { ownerId: decodedUser?.id } },
    });

    if (cars.length < 1) throw new NotFoundException('The is no offer');

    return cars;
  }

  async findOne(id: string) {
    const foundCar = await this._prisma.car.findUnique({
      where: { id },
    });
    if (!foundCar) {
      throw new NotFoundException("This offer doesn't exist");
    }

    return foundCar;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const { image, name, description, price, isAvaible } = updateCarDto;
    await this._prisma.car.update({
      where: {
        id: id,
      },
      data: {
        image: image,
        name: name,
        description: description,
        price: price,
        isAvaible: isAvaible,
      },
    });

    return `updates succefully of the #${id} car`;
  }

  async updateIsAvailbe(id: string, isAvaible: boolean) {
    await this._prisma.car.update({
      where: {
        id: id,
      },
      data: {
        isAvaible: isAvaible,
      },
    });
  }

  async remove(id: string) {
    await this._prisma.car.delete({ where: { id: id } });
  }
}
