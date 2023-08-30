import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../user/user.service';
import { JwtPayload } from '../../../config/types/auth/jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('VERCEL_JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService
            .findById(payload.id)
            .catch((err) => {
                return null;
            });

        if (!user) {
            throw new UnauthorizedException();
        }

        if (user.isBlocked) {
            throw new ForbiddenException();
        }

        return payload;
    }
}
