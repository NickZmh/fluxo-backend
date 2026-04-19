import { ApiProperty } from '@nestjs/swagger';
import { ClientStatus } from '@prisma/client';

export class ProductClientResponseDto {
  @ApiProperty({ example: '6dbbc45e-3897-48ba-b209-5cfbfc5e7e5d' })
  id!: string;

  @ApiProperty({ example: 'John2' })
  name!: string;

  @ApiProperty({ example: 'Doe2' })
  surname!: string;

  @ApiProperty({ example: 'IN_PROGRESS', enum: ClientStatus })
  status!: ClientStatus;
}

export class ProductResponseDto {
  @ApiProperty({ example: '31f7c665-70d5-4221-95aa-11d49cec3ea0' })
  id!: string;

  @ApiProperty({ example: 'MacBook Pro 16' })
  name!: string;

  @ApiProperty({ example: 'High-end laptop', required: false })
  description?: string;

  @ApiProperty({ example: 12999, required: false })
  price?: number;

  @ApiProperty({ example: 'MBP-16-2026', required: false })
  sku?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  imageUrl!: string;

  @ApiProperty({ example: '2026-04-02T12:27:29.788Z' })
  createdAt!: Date;

  @ApiProperty({
    type: [ProductClientResponseDto],
    description: 'Clients assigned to this product',
  })
  clients!: ProductClientResponseDto[];
}
