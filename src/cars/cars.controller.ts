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
  Req,
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
import { payInfos } from '../stripe/dto/payInfos';
import CarVM from './vm/car.vm';
import CarResponseBuilder from './car.response.builder';

@ApiTags('Cars')
//@UseGuards(JwtAuthGuard)
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly _carResponseBuilder: CarResponseBuilder,
  ) {}

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
  async create(
    @Body() createCarDto: CreateCarDto,
  ): Promise<{ message: string }> {
    await this.carsService.create(createCarDto);
    return this._carResponseBuilder.sendResponse('add car succefully');
  }
  @Get()
  @ApiOperation({
    summary: 'get all Cars',
  })
  @ApiOkResponse({
    type: [CarVM],
  })
  @ApiNotFoundResponse({
    description: 'The is no offer',
    type: NotFoundException,
  })
  findAll(@Req() req): Promise<CarVM[]> {
    return this.carsService.findAll(req);
  }

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
    type: CarVM,
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
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.carsService.remove(id);
    return this._carResponseBuilder.sendResponse(
      `This action removes a #${id} car`,
    );
  }
}
