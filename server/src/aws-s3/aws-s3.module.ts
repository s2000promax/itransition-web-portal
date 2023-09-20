import { Module } from '@nestjs/common';
import { AwsS3Controller } from './aws-s3.controller';
import { AwsS3Service } from './aws-s3.service';

@Module({
    imports: [],
    controllers: [AwsS3Controller],
    providers: [AwsS3Service],
})
export class AwsS3Module {}
