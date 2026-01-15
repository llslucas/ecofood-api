import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../schemas/user.schema';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
  })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'Email do usuário',
  })
  @IsEmail({}, { message: 'Forneça um email válido' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @ApiProperty({
    example: UserRole.DOADOR,
    description: 'Papel do usuário',
    enum: UserRole,
  })
  @IsEnum(UserRole, { message: 'O papel deve ser DOADOR ou COLETOR' })
  role: UserRole;
}
