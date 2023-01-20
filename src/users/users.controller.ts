import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Find one user by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The user id',
  })
  @ApiOkResponse({
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User cannot be founded.',
    type: NotFoundException,
  })
  getMyUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all users',
  })
  @ApiOkResponse({
    type: [User],
  })
  @ApiNotFoundResponse({
    description: 'There is no user',
    type: NotFoundException,
  })
  getUsers() {
    return this.usersService.getUsers();
  }
}
