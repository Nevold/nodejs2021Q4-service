import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async uploadFile(file): Promise<string> {
    try {
      const fileName = file.originalname;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const writeStream = fs.createWriteStream(path.join(filePath, fileName));
      writeStream.write(file.buffer);
      writeStream.end();
      return `Copy this to download the file... ${fileName}`;
    } catch (e) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
