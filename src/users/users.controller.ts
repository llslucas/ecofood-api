import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as jwtStrategy from 'src/auth/jwt.strategy';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
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
