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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ClientResponseDto } from './dto/get-client.dto';
import type { Request } from 'express';

@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOkResponse({ type: [ClientResponseDto] })
  findAll() {
    return this.clientsService.findAll();
  }

  @Post()
  @ApiOkResponse({ type: ClientResponseDto })
  create(@Body() dto: CreateClientDto, @Req() req: Request) {
    return this.clientsService.create(dto, req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: ClientResponseDto })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ClientResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Client deleted successfully' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
