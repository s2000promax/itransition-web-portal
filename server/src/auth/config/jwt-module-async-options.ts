import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
    secret: config.get('VERCEL_JWT_SECRET'),
    signOptions: {
        expiresIn: config.get('VERCEL_JWT_EXPIRED', '5m'),
    },
});

export const options = (): JwtModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
