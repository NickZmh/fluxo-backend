import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import { Injectable } from '@nestjs/common';

export interface UploadUrlResponse {
  uploadUrl: string;
  fileUrl: string;
}

@Injectable()
export class ImagesService {
  private lambda = new LambdaClient({ region: 'eu-central-1' });

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
