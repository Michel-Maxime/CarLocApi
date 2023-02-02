import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';
import AuthResponseBuilder from './auth.response.builder';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authResponseBuilder: AuthResponseBuilder,
  ) {}

  @Post('signup')
  @ApiOperation({
    summary: 'signup',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'the credentials',
  })
  @ApiOkResponse({
    type: Object,
  })
  @ApiNotFoundResponse({
    description: 'Error during signup',
    type: InternalServerErrorException,
  })
  async signup(@Body() dto: RegisterDto, @Res() res) {
    const token = await this.authService.signin(dto);
    res.cookie('token', token);
    return this.authResponseBuilder.sendResponse('signup was succefull');
  }

  @Post('signin')
  @ApiOperation({
    summary: 'signin',
  })
  @ApiBody({
    type: LoginDto,
    description: 'the credentials',
  })
  @ApiOkResponse({
    type: Object,
  })
  @ApiNotFoundResponse({
    description: 'Error during signin',
    type: InternalServerErrorException,
  })
  async signin(@Body() dto: LoginDto, @Res() res) {
    const token = await this.authService.signin(dto);
    res.cookie('token', token);
    res.send(this.authResponseBuilder.sendResponse('signin was succefull'));
  }

  @Get('signout')
  @ApiOperation({
    summary: 'signout',
  })
  @ApiOkResponse({
    type: Object,
  })
  @ApiNotFoundResponse({
    description: 'Error during signout',
    type: InternalServerErrorException,
  })
  signout(@Res() res) {
    res.clearCookie('token');
    res.send(this.authResponseBuilder.sendResponse('signout was succefull'));
  }
}
