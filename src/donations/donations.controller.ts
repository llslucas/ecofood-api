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
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova doação (Apenas Doador)' })
  @ApiResponse({ status: 201, description: 'Doação criada com sucesso.' })
  @ApiResponse({
    status: 403,
    description: 'Proibido. Apenas doadores podem criar.',
  })
  create(
    @Body() createDonationDto: CreateDonationDto,
    @Request() req: { user: jwtStrategy.AuthenticatedUser },
  ) {
    if (req.user.role !== UserRole.DOADOR) {
      throw new ForbiddenException(
        'Apenas doadores podem cadastrar alimentos.',
      );
    }

    return this.donationsService.create(createDonationDto, req.user.userId);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Busca todas as doações realizadas pelo usuário atual',
  })
  async findAll(@CurrentUser() user: jwtStrategy.AuthenticatedUser) {
    return await this.donationsService.findAllByUser(user.userId);
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Busca doações próximas por raio (km)' })
  findNearby(@Query() query: GetDonationsQueryDto) {
    return this.donationsService.findNearby(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca uma doação pelo ID (Apenas Coletor)',
  })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: jwtStrategy.AuthenticatedUser,
  ) {
    if (user.role !== UserRole.COLETOR) {
      throw new ForbiddenException('Permissão negada.');
    }
    return this.donationsService.findOne(id);
  }

  @Patch(':id/reserve')
  @ApiOperation({
    summary: 'Reserva uma doação pelo ID (Apenas Coletor)',
  })
  async reserve(
    @Param('id') id: string,
    @CurrentUser() user: jwtStrategy.AuthenticatedUser,
  ) {
    if (user.role !== UserRole.COLETOR) {
      throw new ForbiddenException(
        'Apenas coletores podem reservar alimentos.',
      );
    }

    return await this.donationsService.reserve(id, user.userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove uma doação pelo ID (Apenas Doador)',
  })
  remove(
    @Param('id') id: string,
    @CurrentUser() user: jwtStrategy.AuthenticatedUser,
  ) {
    return this.donationsService.remove(id, user.userId);
  }
}
