import { ApiProperty } from '@nestjs/swagger';
import { ClientStatus } from '@prisma/client';
import { ProductIdObject } from 'src/modules/products/dto/create-product.dto';

export class ClientIdObject {
  @ApiProperty({ example: 'client id' })
  id!: string;
}

export class CreateClientDto {
  @ApiProperty({ example: 'John' })
  name!: string;

  @ApiProperty({ example: 'Doe' })
  surname!: string;

  @ApiProperty({ example: '+48 123 456 789', required: false })
  phone?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  email?: string;

  @ApiProperty({ example: 'Some notes', required: false })
  notes?: string;

  @ApiProperty({
    example: ClientStatus.NEW,
    enum: ClientStatus,
  })
  status!: ClientStatus;

  @ApiProperty({
    required: true,
    description: 'Products assigned to this client',
    example: [{ id: 'product id' }],
  })
  products?: ProductIdObject[];
}
