import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Forneça um email válido' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}
