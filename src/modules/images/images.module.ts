import { Module } from '@nestjs/common';
import { ImagesController } from './images.controllers';
import { ImagesService } from './images.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
