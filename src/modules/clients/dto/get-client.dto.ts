import { ApiProperty } from '@nestjs/swagger';
import { ClientStatus } from '@prisma/client';

export class ClientProductResponseDto {
  @ApiProperty({ example: '31f7c665-70d5-4221-95aa-11d49cec3ea0' })
  id!: string;

  @ApiProperty({ example: 'MacBook Pro 16' })
  name!: string;
}

export class ClientResponseDto {
  @ApiProperty({ example: '6dbbc45e-3897-48ba-b209-5cfbfc5e7e5d' })
  id!: string;

  @ApiProperty({ example: 'John2' })
  name!: string;

  @ApiProperty({ example: 'Doe2' })
  surname!: string;

  @ApiProperty({ example: '+48 123 456 789', required: false })
  phone?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  email?: string;

  @ApiProperty({ example: 'Some notes', required: false })
  notes?: string;

  @ApiProperty({ example: 'IN_PROGRESS', enum: ClientStatus })
  status!: ClientStatus;

  @ApiProperty({ example: '60cc1cf8-779b-4df2-92d5-c26a1545ee00' })
  userId!: string;

  @ApiProperty({
    type: [ClientProductResponseDto],
    description: 'Products assigned to this client',
  })
  products!: ClientProductResponseDto[];

  @ApiProperty({ example: '2026-04-02T11:37:49.041Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-04-02T11:37:49.041Z' })
  updatedAt!: Date;
}
