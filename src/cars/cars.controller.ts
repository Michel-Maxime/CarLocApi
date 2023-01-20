import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
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
import { Car } from '../stripe/dto/car';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOperation({
    summary: 'create offer',
  })
  @ApiBody({
    type: CreateCarDto,
    description: 'the new offer',
  })
  @ApiOkResponse({
    type: Object,
  })
  @ApiNotFoundResponse({
    description: 'Error during creating offer',
    type: InternalServerErrorException,
  })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }
  //@UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'get all Cars',
  })
  @ApiOkResponse({
    type: [Car],
  })
  @ApiNotFoundResponse({
    description: 'The is no offer',
    type: NotFoundException,
  })
  findAll(@Headers() headers) {
    console.log(headers);

    return this.carsService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'get offer by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The car id',
  })
  @ApiOkResponse({
    type: Car,
  })
  @ApiNotFoundResponse({
    description: "This offer doesn't exist",
    type: NotFoundException,
  })
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update offer by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The car id',
  })
  @ApiBody({
    type: UpdateCarDto,
    description: 'the changes',
  })
  @ApiOkResponse({
    type: String,
  })
  @ApiNotFoundResponse({
    description: "This offer doesn't exist",
    type: NotFoundException,
  })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    console.log(updateCarDto);
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete offer by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The car id',
  })
  @ApiOkResponse({
    type: String,
  })
  @ApiNotFoundResponse({
    description: "This offer doesn't exist",
    type: NotFoundException,
  })
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
