import { ApiProperty } from '@nestjs/swagger';

export class UploadUrlResponseDto {
  @ApiProperty({
    example: 'https://bucket.s3.eu-central-1.amazonaws.com/abc123?...',
    description:
      'A pre‑signed URL that allows uploading a file directly to S3.',
  })
  uploadUrl!: string;

  @ApiProperty({
    example:
      'https://fluxo-app-image.s3.amazonaws.com/uploads/1776270020206.jpg',
    description:
      'A public URL where the uploaded file will be accessible after the upload.',
  })
  fileUrl!: string;
}
