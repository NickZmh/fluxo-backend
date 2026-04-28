import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductResponseDto } from './dto/get-product.dto';
import type { Request } from 'express';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({ type: [ProductResponseDto] })
  @Get()
  findAll(@Req() req: Request) {
    return this.productsService.findAll(req.user.id);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Req() req: Request) {
    return this.productsService.findById(id, req.user.id);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  create(@Body() dto: CreateProductDto, @Req() req: Request) {
    return this.productsService.create(dto, req.user.id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Req() req: Request,
  ) {
    return this.productsService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: Request) {
    return this.productsService.delete(id, req.user.id);
  }
}
