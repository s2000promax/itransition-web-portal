import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get('YANDEX_CLIENT_ID'),
            clientSecret: configService.get('YANDEX_CLIENT_SECRET'),
            callbackURL: 'http://localhost:8002/api/auth/yandex/callback',
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const { id, displayName, emails, photos } = profile;

        const user = {
            id,
            displayName,
            email: emails[0].value,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
}
