import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productPublicFields } from './selects/product.selects';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.product.findMany({
      where: { userId },
      select: productPublicFields,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, userId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, userId },
      select: productPublicFields,
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: CreateProductDto, userId: string) {
    const { clients, ...productData } = data;

    return this.prisma.product.create({
      data: {
        ...productData,
        userId,
        ...(clients && {
          clients: {
            connect: clients.filter((c) => c?.id).map((c) => ({ id: c.id })),
          },
        }),
      },
      include: {
        clients: true,
      },
    });
  }

  async update(id: string, dto: UpdateProductDto, userId: string) {
    await this.findById(id, userId);

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

  async delete(id: string, userId: string) {
    await this.findById(id, userId);

    return this.prisma.product.delete({
      where: { id },
      select: productPublicFields,
    });
  }
}
