import { Body, Controller, Post } from '@nestjs/common';
import { GetUploadUrlDto } from './dto/get-upload-url.dto';
import { ImagesService, UploadUrlResponse } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload-url')
  async getUploadUrl(@Body() dto: GetUploadUrlDto): Promise<UploadUrlResponse> {
    return this.imagesService.getUploadUrl(dto.fileType);
  }
}
