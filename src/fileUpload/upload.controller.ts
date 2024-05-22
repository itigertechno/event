import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import EasyYandexS3 from 'easy-yandex-s3';

@Controller('upload')
export class UploadController {
  private s3: any;

  constructor() {
    this.s3 = new EasyYandexS3({
      auth: {
        accessKeyId: 'YCAJEUfbd1NnpblIhtHocUS0a',
        secretAccessKey: 'YCNTtdv5k0N9AgviIwAWEhZiZ5HkuEJd7CHrqbQN',
      },
      Bucket: 'qamtoo',
    });
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return await this.s3.Upload({ buffer: file.buffer }, '/avatar');
  }

  @Post('event')
  @UseInterceptors(FileInterceptor('event'))
  async uploadEventImage(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return await this.s3.Upload({ buffer: file.buffer }, '/event');
  }
}
