import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _jwt: JwtService,
  ) {}

  async signup(dto: RegisterDto): Promise<string> {
    const { email, password, name } = dto;

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
        name,
        hashedPassword,
      },
    });

    return await this.signin(dto);
  }
  async signin(dto: LoginDto): Promise<string> {
    const { email, password } = dto;

    const foundUser = await this._prisma.user.findUnique({
      where: { email: email },
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });

    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException();
    }

    return token;
  }

  // TODO : do a service
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; email: string }): Promise<string> {
    const payload = args;

    return this._jwt.signAsync(payload, { secret: jwtSecret });
  }
}
