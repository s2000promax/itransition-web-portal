import { Injectable, UploadedFile } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { MulterFileI } from './types/multerFile.interface';

@Injectable()
export class AwsS3Service {
    private s3: S3Client;

    constructor(private configService: ConfigService) {
        this.s3 = new S3Client({
            region: this.configService.get('VERCEL_AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('VERCEL_AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get(
                    'VERCEL_AWS_ACCESS_KEY',
                ),
            },
        });
    }

    async uploadFile(@UploadedFile() file: MulterFileI): Promise<string> {
        const params = {
            Bucket: this.configService.get('VERCEL_AWS_BUCKET_NAME'),
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            // ACL: 'public-read',
        };

        try {
            const result = await this.s3.send(new PutObjectCommand(params));
            return `https://${params.Bucket}.s3.${this.configService.get(
                'VERCEL_AWS_REGION',
            )}.amazonaws.com/${params.Key}`;
        } catch (err) {
            throw new Error(
                `Failed to upload file to S3. Reason: ${err.message}`,
            );
        }
    }
}
