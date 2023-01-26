import { User } from '@prisma/client';
import IResponseBuilder from '../utils/response.builder';
import UserVM from './vm/usersVM';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UsersResponseBuilder
  implements IResponseBuilder<User, UserVM>
{
  sendResponse(msg: string): { message: string } {
    return { message: msg };
  }
  sendItem(user: User): UserVM {
    if (user == undefined) return;

    // return {
    //   id: user.id,
    //   email: user.email,
    //   createdAt: user.createdAt,
    //   cars: user.cars,
    // } as UserVM;
  }
  sendItems(a: User[]): UserVM[] {
    throw new Error('Method not implemented.');
  }
}
