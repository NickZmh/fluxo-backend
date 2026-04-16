import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({
    example: '8f3c1c2b-9b4e-4c1a-9e3d-1a2b3c4d5e6f',
  })
  id!: string;

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  email!: string;

  @ApiProperty({
    example: 'John',
  })
  firstName!: string;

  @ApiProperty({
    example: 'Doe',
  })
  lastName!: string;

  @ApiProperty({
    required: false,
    example: 'https://cdn.example.com/avatars/user123.jpg',
  })
  avatar?: string;

  @ApiProperty({
    required: false,
    example: '+48 600 700 800',
  })
  phone?: string;

  @ApiProperty({
    required: false,
    example: 'Warsaw, Poland',
  })
  location?: string;

  @ApiProperty({
    required: false,
    example: '1995-06-12',
  })
  birthDate?: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.user,
  })
  role!: UserRole;

  @ApiProperty({
    enum: UserStatus,
    example: UserStatus.active,
  })
  status!: UserStatus;

  @ApiProperty({
    example: '2024-01-15T12:34:56.000Z',
  })
  createdAt!: Date;
}
