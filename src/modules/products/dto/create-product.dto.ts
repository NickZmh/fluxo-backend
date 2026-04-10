import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsUUID,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClientIdObject } from 'src/modules/clients/dto/create-client.dto';

export class ProductIdObject {
  @ApiProperty({ example: 'product id' })
  id!: string;
}

export class CreateProductDto {
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

  @ApiProperty({ example: 'a3c1b1f0-9d2e-4c3a-8e1f-123456789abc' })
  userId!: string;

  @ApiProperty({ type: [ClientIdObject], required: false })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  clients?: ClientIdObject[];
}
