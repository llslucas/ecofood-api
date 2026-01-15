import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'Endereço de email do usuário',
  })
  @IsEmail({}, { message: 'Forneça um email válido' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}
