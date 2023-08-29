import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './config/app/appConfig';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfiguration],
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
