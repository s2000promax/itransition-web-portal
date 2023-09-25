import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from './config/app/swaggerConfig';
import appConfig from './config/app/appConfig';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        allowedHeaders: [
            'content-type',
            'Access-Control-Allow-Credentials',
            'Origin',
            'X-Requested-With',
            'Authorization',
            'Accept',
        ],
        origin: appConfig().origins,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    app.use(cookieParser());
    app.setGlobalPrefix('api');

    if (process.env.VERCEL_NODE_ENV !== 'production') {
        const document = SwaggerModule.createDocument(app, swaggerConfig());
        SwaggerModule.setup('api-doc', app, document);
    }

    const port = appConfig().port;

    await app.listen(port);
}
bootstrap();
