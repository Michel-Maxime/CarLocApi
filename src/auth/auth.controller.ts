import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
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
  signin(@Body() dto: AuthDto, @Req() req, @Res() res) {
    return this.authService.signin(dto, req, res);
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
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req, res);
  }
}
