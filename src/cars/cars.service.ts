import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createCarDto: CreateCarDto) {
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

    return { message: 'add car succefully' };
  }

  async findAll() {
    const cars = await this._prisma.car.findMany({
      // include: {
      //   owner: true,
      // },
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

  async remove(id: string) {
    await this._prisma.car.delete({ where: { id: id } });

    return `This action removes a #${id} car`;
  }
}
