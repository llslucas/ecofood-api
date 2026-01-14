import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as jwtStrategy from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@UseGuards(JwtAuthGuard)
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  create(
    @Body() createDonationDto: CreateDonationDto,
    @Request() req: { user: jwtStrategy.AuthenticatedUser },
  ) {
    if (req.user.role !== 'DOADOR') {
      throw new Error('Apenas doadores podem cadastrar alimentos.');
    }

    return this.donationsService.create(createDonationDto, req.user.userId);
  }

  @Get('me')
  findAll(@Request() req: { user: jwtStrategy.AuthenticatedUser }) {
    return this.donationsService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req: { user: jwtStrategy.AuthenticatedUser },
  ) {
    return this.donationsService.remove(id, req.user.userId);
  }
}
