import IResponseBuilder from '../utils/response.builder';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class AuthResponseBuilder implements IResponseBuilder<any, any> {
  sendResponse(a: string): { message: string } {
    return { message: a };
  }
  sendItem(a: any) {
    throw new Error('Method not implemented.');
  }
  sendItems(a: any[]): any[] {
    throw new Error('Method not implemented.');
  }
}
