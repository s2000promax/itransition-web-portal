import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './config/app/appConfig';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { RateModule } from './rate/rate.module';
import { ReviewModule } from './review/review.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { WorkModule } from './work/work.module';
import { TagModule } from './tag/tag.module';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfiguration],
            isGlobal: true,
        }),
        PrismaModule,
        AuthModule,
        UserModule,
        WorkModule,
        ReviewModule,
        CommentModule,
        RateModule,
        AwsS3Module,
        TagModule,
        AdminModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        AppService,
    ],
})
export class AppModule {}
