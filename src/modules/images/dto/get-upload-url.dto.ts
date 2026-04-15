import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUploadUrlDto {
  @ApiProperty({
    example: 'image/png',
    description: 'The MIME type of the file that will be uploaded.',
  })
  @IsString()
  fileType!: string;
}
