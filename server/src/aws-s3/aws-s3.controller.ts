import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from './aws-s3.service';
import { MulterFileI } from './types/multerFile.interface';

@Controller('upload')
export class AwsS3Controller {
    constructor(private awsS3Service: AwsS3Service) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: MulterFileI) {
        console.log(file);
        try {
            const url = await this.awsS3Service.uploadFile(file);
            return { url };
        } catch (error) {
            throw error;
        }
    }
}
