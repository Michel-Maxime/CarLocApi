import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';
import AuthResponseBuilder from './auth.response.builder';

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
    type: AuthDto,
    description: 'the credentials',
  })
  @ApiOkResponse({
    type: Object,
  })
  @ApiNotFoundResponse({
    description: 'Error during signup',
    type: InternalServerErrorException,
  })
  async signup(@Body() dto: AuthDto): Promise<{ message: string }> {
    await this.authService.signup(dto);
    return this.authResponseBuilder.sendResponse('signup was succefull');
  }

  @Post('signin')
  @ApiOperation({
    summary: 'signin',
  })
  @ApiBody({
    type: AuthDto,
    description: 'the credentials',
  })
  @ApiOkResponse({
    type: Object,
  })
  @ApiNotFoundResponse({
    description: 'Error during signin',
    type: InternalServerErrorException,
  })
  async signin(@Body() dto: AuthDto, @Res() res): Promise<{ message: string }> {
    const token = await this.authService.signin(dto);
    res.cookie('token', token);
    return this.authResponseBuilder.sendResponse('signin was succefull');
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
  signout(@Res() res): { message: string } {
    res.clearCookie('token');
    return this.authResponseBuilder.sendResponse('signout was succefull');
  }
}
