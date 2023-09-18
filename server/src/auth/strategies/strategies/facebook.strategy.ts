import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import appConfig from '../../../config/app/appConfig';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get('FACEBOOK_CLIENT_ID'),
            clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
            callbackURL: `${
                appConfig().serverDomain
            }/api/auth/facebook/callback`,
            scope: 'email',
            profileFields: ['emails', 'name', 'photos'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            photo: photos[0].value,
        };
        const payload = {
            ...user,
            accessToken,
        };

        done(null, payload);
    }
}
