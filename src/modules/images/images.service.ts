import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import { Injectable } from '@nestjs/common';

export interface UploadUrlResponse {
  uploadUrl: string;
  fileUrl: string;
}

console.log('ENV CHECK', {
  region: process.env.AWS_REGION,
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class ImagesService {
  private lambda = new LambdaClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  async getUploadUrl(fileType: string) {
    const payload = JSON.stringify({ fileType });

    const command = new InvokeCommand({
      FunctionName: 'imageProccesor',
      Payload: Buffer.from(payload),
    });

    const response = await this.lambda.send(command);

    const result = JSON.parse(
      new TextDecoder().decode(response.Payload),
    ) as UploadUrlResponse;

    return result;
  }
}
