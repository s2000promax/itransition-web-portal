import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './config/app/appConfig';
import { GoModule } from './go/go.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfiguration],
            isGlobal: true,
        }),
        // PrismaModule,
        // AuthModule,
        // UserModule,
        // WorkModule,
        // ReviewModule,
        // CommentModule,
        // RateModule,
        // AwsS3Module,
        // TagModule,
        // AdminModule,
        // AboutContentModule,
        // NotificationsModule,
        GoModule,
    ],
    controllers: [AppController],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard,
        // },
        AppService,
    ],
})
export class AppModule {}
