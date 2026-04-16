import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUploadUrlDto } from './dto/get-upload-url.dto';
import { ImagesService, UploadUrlResponse } from './images.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UploadUrlResponseDto } from './dto/image.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload-url')
  @ApiOkResponse({ type: UploadUrlResponseDto })
  @ApiBody({ type: GetUploadUrlDto })
  async getUploadUrl(@Body() dto: GetUploadUrlDto): Promise<UploadUrlResponse> {
    return this.imagesService.getUploadUrl(dto.fileType);
  }
}
