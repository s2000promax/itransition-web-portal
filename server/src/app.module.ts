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

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfiguration],
            isGlobal: true,
        }),
        PrismaModule,
        AuthModule,
        UserModule,
        CommentModule,
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
