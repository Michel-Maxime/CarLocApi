import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { payInfos } from './dto/payInfos';
import { StripeService } from './stripe.service';
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

@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly _stripeService: StripeService) {}

  @Post()
  @ApiOperation({
    summary: 'pay for an offer',
  })
  @ApiBody({
    type: payInfos,
    description: 'the new offer',
  })
  @ApiOkResponse({
    type: Object,
  })
  @ApiNotFoundResponse({
    description: 'Error during pay for offer',
    type: InternalServerErrorException,
  })
  checkout(@Body() body: { payInfos: payInfos }) {
    return this._stripeService.checkout(body.payInfos);
  }
}
