import { ApiProperty } from '@nestjs/swagger';

export class UploadUrlResponseDto {
  @ApiProperty({
    example: 'https://bucket.s3.eu-central-1.amazonaws.com/abc123?...',
    description:
      'A pre‑signed URL that allows uploading a file directly to S3.',
  })
  uploadUrl!: string;

  @ApiProperty({
    example: 'image/png',
    description:
      'The MIME type of the file for which the upload URL was generated.',
  })
  fileType!: string;
}
