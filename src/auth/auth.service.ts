import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly _prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const foundUser = await this._prisma.user.findUnique({
      where: { email: email },
    });

    if (foundUser) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this._prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return { message: 'signup was successful' };
  }
  async signin() {
    return '';
  }
  async signout() {
    return '';
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }
}
