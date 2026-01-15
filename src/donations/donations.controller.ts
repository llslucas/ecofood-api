import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as jwtStrategy from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserRole } from 'src/users/schemas/user.schema';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { GetDonationsQueryDto } from './dto/get-donations-query.dto';

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
      throw new ForbiddenException(
        'Apenas doadores podem cadastrar alimentos.',
      );
    }

    return this.donationsService.create(createDonationDto, req.user.userId);
  }

  @Get('me')
  findAll(@Request() req: { user: jwtStrategy.AuthenticatedUser }) {
    return this.donationsService.findAllByUser(req.user.userId);
  }

  @Get('nearby')
  findNearby(@Query() query: GetDonationsQueryDto) {
    return this.donationsService.findNearby(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }

  @Patch(':id/reserve')
  async reserve(
    @Param('id') id: string,
    @Request() req: { user: jwtStrategy.AuthenticatedUser },
  ) {
    if ((req.user.role as UserRole) !== UserRole.COLETOR) {
      throw new ForbiddenException(
        'Apenas coletores podem reservar alimentos.',
      );
    }

    return await this.donationsService.reserve(id, req.user.userId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req: { user: jwtStrategy.AuthenticatedUser },
  ) {
    return this.donationsService.remove(id, req.user.userId);
  }
}
