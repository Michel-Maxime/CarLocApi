import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private _prisma: PrismaService) {}
  async getUserById(id: string, req: Request) {
    const user = await this._prisma.user.findUnique({
      where: { id },
      include: { cars: true },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const decodedUser = req.user as { id: string; email: string };

    console.log(decodedUser);

    if (user.id !== decodedUser?.id) {
      throw new ForbiddenException();
    }

    delete user.hashedPassword;

    //console.log(user);

    return user;
  }

  async getCurrentUser(req: Request) {
    const decodedUser = req.user as { id: string; email: string };

    if (decodedUser?.id == undefined) throw new ForbiddenException();

    const user = await this._prisma.user.findUnique({
      where: { id: decodedUser?.id },
      include: { cars: true },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.hashedPassword;

    return user;
  }

  async getUsers() {
    const users = await this._prisma.user.findMany({
      select: { id: true, email: true },
    });

    if (users.length < 1) throw new NotFoundException();

    return users;
  }
}
