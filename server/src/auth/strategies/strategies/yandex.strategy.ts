import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-yandex';
import appConfig from '../../../config/app/appConfig';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get('YANDEX_CLIENT_ID'),
            clientSecret: configService.get('YANDEX_CLIENT_SECRET'),
            callbackURL: `${appConfig().serverDomain}/api/auth/yandex/callback`,
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
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
