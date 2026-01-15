import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autentica um usuário e retorna um token JWT' })
  @ApiResponse({
    status: 201,
    description: 'Usuário autenticado com sucesso, retornará um token JWT.',
  })
  @ApiResponse({
    status: 400,
    description: 'A senha deve ter no mínimo 6 caracteres',
  })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(user as UserDocument);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário e retorna um token JWT' })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso, retornará um token JWT.',
  })
  @ApiResponse({
    status: 400,
    description: 'A senha deve ter no mínimo 6 caracteres',
  })
  @ApiResponse({
    status: 409,
    description: 'Email já está em uso',
  })
  async create(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
