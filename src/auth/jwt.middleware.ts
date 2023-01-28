import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly _jwt: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (token) {
      const decoded = this._jwt.verify(token, { secret: jwtSecret });

      req.user = decoded;
    }

    next();
  }
}
