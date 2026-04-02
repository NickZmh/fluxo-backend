import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateUserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userPublicFields = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  avatar: true,
  role: true,
  status: true,
  createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: userPublicFields,
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userPublicFields,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(data: CreateUserData) {
    return await this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
