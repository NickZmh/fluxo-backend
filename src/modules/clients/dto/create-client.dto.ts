import { ApiProperty } from '@nestjs/swagger';
import { ClientStatus } from '@prisma/client';

export class CreateClientDto {
  @ApiProperty({ example: 'John' })
  name: string;

  @ApiProperty({ example: 'Doe' })
  surname: string;

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
  status: ClientStatus;

  @ApiProperty({ example: 'uuid-of-user' })
  userId: string;
}
