import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class LocationDto {
  @ApiProperty({ example: 'Point', default: 'Point' })
  @IsString()
  @IsEnum(['Point'])
  type: string;

  @ApiProperty({
    example: [-46.633308, -23.55052],
    description: 'Coordenadas [Longitude, Latitude]',
    type: [Number],
  })
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: number[];
}

export class CreateDonationDto {
  @ApiProperty({
    example: 'Cesta de Verduras',
    description: 'Título do alimento doado',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Cesta contendo: 10 cenouras, 5 batatas e 6 tomates',
    description: 'Breve descrição do alimento doado',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '5kg', description: 'Peso do alimento em texto' })
  @IsNotEmpty()
  @IsString()
  quantity: string;

  @ApiProperty({
    example: '2026-12-31T18:00:00.000Z',
    description: 'Data em formato ISO 8601',
  })
  @IsNotEmpty()
  @IsDateString()
  expiration: string;

  @ApiProperty({ type: LocationDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
