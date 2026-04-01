import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPrismaExceptionFilter } from './filters/user-prisma-exception.filter';
import { AllowGuard } from '../../guards/alow.guards';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@UseFilters(UserPrismaExceptionFilter)
@UseGuards(AllowGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @ApiExcludeEndpoint()
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
