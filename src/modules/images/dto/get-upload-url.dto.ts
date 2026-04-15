import { IsString } from 'class-validator';

export class GetUploadUrlDto {
  @IsString()
  fileType!: string;
}
