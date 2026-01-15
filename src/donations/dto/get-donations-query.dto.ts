import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDonationsQueryDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  long: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1) // Mínimo 1km de raio
  radius: number; // Raio em Kilômetros
}
