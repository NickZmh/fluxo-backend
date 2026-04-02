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
    const { clientIds, ...productData } = data;

    return this.prisma.product.create({
      data: {
        ...productData,
        clients: clientIds
          ? {
              connect: clientIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        clients: true,
      },
    });
  }

  update(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data,
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
