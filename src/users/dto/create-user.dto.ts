import { UserRole } from '../schemas/user.schema';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail({}, { message: 'Forneça um email válido' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsEnum(UserRole, { message: 'O papel deve ser DOADOR ou COLETOR' })
  role: UserRole;
}
