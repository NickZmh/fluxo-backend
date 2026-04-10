import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsUUID,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'Laptop Lenovo X1' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Business ultrabook', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 4999.99, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ example: 'SKU-12345', required: false })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  clients?: { id: string }[];
}
