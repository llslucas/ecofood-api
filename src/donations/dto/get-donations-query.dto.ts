import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetDonationsQueryDto {
  @ApiProperty({
    example: -23.55052,
    description: 'Latitude',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty({
    example: -46.633308,
    description: 'Longitude',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  long: number;

  @ApiProperty({
    example: '5',
    description: 'Raio da busca em km',
    minimum: 1,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1) // Mínimo 1km de raio
  radius: number; // Raio em Kilômetros
}
