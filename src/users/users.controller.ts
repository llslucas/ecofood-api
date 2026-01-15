import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwtStrategy from 'src/auth/jwt.strategy';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Retorna os dados do usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário autenticado retornados com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
  })
  getProfile(@CurrentUser() user: jwtStrategy.AuthenticatedUser) {
    return user;
  }
}
