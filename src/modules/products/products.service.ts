import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const productPublicFields = {
  id: true,
  name: true,
  description: true,
  price: true,
  sku: true,
  createdAt: true,
  clients: {
    select: {
      id: true,
      name: true,
      surname: true,
      status: true,
    },
  },
} as const;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany({
      select: productPublicFields,
    });
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: productPublicFields,
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: CreateProductDto) {
    const { clients, ...productData } = data;

    return this.prisma.product.create({
      data: {
        ...productData,
        clients: clients
          ? {
              connect: clients.map(({ id }) => ({ id })),
            }
          : undefined,
      },
      include: {
        clients: true,
      },
    });
  }

  update(id: string, dto: UpdateProductDto) {
    const { clients, ...productData } = dto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(clients && {
          clients: {
            set: clients.map((c) => ({ id: c.id })),
          },
        }),
      },
      select: productPublicFields,
    });
  }

  delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
      select: productPublicFields,
    });
  }
}
