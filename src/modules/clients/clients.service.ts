import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClientDto) {
    const { products, ...clientData } = data;

    return this.prisma.client.create({
      data: {
        ...clientData,
        products: products
          ? {
              connect: products.map(({ id }) => ({ id })),
            }
          : undefined,
      },
      include: {
        products: { select: { id: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        products: { select: { id: true, name: true } },
      },
    });
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        products: { select: { id: true, name: true } },
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async update(id: string, dto: UpdateClientDto) {
    await this.findOne(id);

    const { products, ...clientData } = dto;

    return this.prisma.client.update({
      where: { id },
      data: {
        ...clientData,
        ...(products && {
          products: {
            set: products.map((p) => ({ id: p.id })),
          },
        }),
      },
      include: {
        products: { select: { id: true } },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.client.delete({
      where: { id },
    });
  }
}
