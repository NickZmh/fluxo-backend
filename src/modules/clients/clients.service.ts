import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { clientPublicSelect } from './selects/select.client';
import { mapClient } from './mappers/client.mapper';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const cliens = await this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      select: clientPublicSelect,
    });

    return cliens.map(mapClient);
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      select: clientPublicSelect,
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return mapClient(client);
  }

  async create(data: CreateClientDto, userId: string) {
    const { products, ...clientData } = data;

    const clients = await this.prisma.client.create({
      data: {
        ...clientData,
        userId,
        products: products
          ? {
              connect: products.map(({ id }) => ({ id })),
            }
          : undefined,
      },
      select: clientPublicSelect,
    });

    return mapClient(clients);
  }

  async update(id: string, dto: UpdateClientDto) {
    await this.findOne(id);

    const { products, ...clientData } = dto;

    const client = await this.prisma.client.update({
      where: { id },
      data: {
        ...clientData,
        ...(products && {
          products: {
            set: products.map((p) => ({ id: p.id })),
          },
        }),
      },
      select: clientPublicSelect,
    });

    return mapClient(client);
  }

  async remove(id: string) {
    await this.findOne(id);

    const client = await this.prisma.client.delete({
      where: { id },
      select: clientPublicSelect,
    });

    return mapClient(client);
  }
}
