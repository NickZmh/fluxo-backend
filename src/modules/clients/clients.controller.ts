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
  findAll(@Req() req: Request) {
    return this.clientsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: ClientResponseDto })
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.clientsService.findOne(id, req.user.id);
  }

  @Post()
  @ApiOkResponse({ type: ClientResponseDto })
  create(@Body() dto: CreateClientDto, @Req() req: Request) {
    return this.clientsService.create(dto, req.user.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ClientResponseDto })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateClientDto,
    @Req() req: Request,
  ) {
    return this.clientsService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Client deleted successfully' })
  remove(@Param('id') id: string, req: Request) {
    return this.clientsService.remove(id, req.user.id);
  }
}
