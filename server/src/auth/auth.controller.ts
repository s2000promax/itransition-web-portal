import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpStatus,
    Post,
    Query,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { map, mergeMap } from 'rxjs';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { Response, Request } from 'express';

import { Cookie, Public } from '../libs/decorators';
import { UserResponse } from '../user/responses';
import { LoginDto, RegisterDto } from './dto';
import { CookiesEnums } from '../config/enums/cookies.enums';
import { ProvidersEnums } from '../config/enums/providers.enums';
import { TokensInterface } from '../config/types/auth/tokens.interface';
import { ApiTags } from '@nestjs/swagger';
import { GoogleGuard, YandexGuard } from './guards';

import { handleTimeoutAndErrors } from '../libs/helpers';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() dto: RegisterDto, @Res() res: Response) {
        const user = await this.authService.register(dto);
        if (!user) {
            throw new BadRequestException(
                `Failed to register user with data: ${JSON.stringify(dto)}`,
            );
        }
        res.status(HttpStatus.OK).send();
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res() res: Response) {
        const tokens = await this.authService.login(dto);
        if (!tokens) {
            throw new BadRequestException(
                `Failed to login with data: ${JSON.stringify(dto)}`,
            );
        }

        this.setRefreshTokenToCookies(tokens, res);
    }

    @Get('logout')
    async logout(
        @Cookie(CookiesEnums.REFRESH_TOKEN) refreshToken: string,
        @Res() res: Response,
    ) {
        if (!refreshToken) {
            res.status(HttpStatus.OK).send();
        }
        await this.authService.deleteRefreshToken(refreshToken);
        res.cookie(CookiesEnums.REFRESH_TOKEN, '', {
            httpOnly: true,
            secure: true,
            expires: new Date(),
        });
        res.status(HttpStatus.OK).send();
    }

    @Get('refresh-tokens')
    async refreshTokens(
        @Cookie(CookiesEnums.REFRESH_TOKEN) refreshToken: string,
        @Res() res: Response,
    ) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        const tokens = await this.authService.refreshTokens(refreshToken);

        if (!tokens) {
            throw new UnauthorizedException();
        }

        this.setRefreshTokenToCookies(tokens, res);
    }

    private setRefreshTokenToCookies(tokens: TokensInterface, res: Response) {
        if (!tokens) {
            throw new UnauthorizedException();
        }
        res.cookie(CookiesEnums.REFRESH_TOKEN, tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.expired),
            secure:
                this.configService.get('VERCEL_NODE_ENV', 'production') ===
                'production',
            path: '/',
        });
        res.status(HttpStatus.CREATED).json({
            accessToken: tokens.accessToken,
        });
    }

    @UseGuards(GoogleGuard)
    @Get('google')
    googleAuth() {}

    @UseGuards(GoogleGuard)
    @Get('google/callback')
    googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        const token = req.user['accessToken'];
        return res.redirect(
            `http://localhost:8002/api/auth/success?token=${token}`,
        );
    }

    @Get('success-google')
    successGoogle(@Query('token') token: string, @Res() res: Response) {
        return this.httpService
            .get(
                `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
            )
            .pipe(
                mergeMap(({ data: { email } }) =>
                    this.authService.providerAuth(email, ProvidersEnums.GOOGLE),
                ),
                map((data) => this.setRefreshTokenToCookies(data, res)),
                handleTimeoutAndErrors(),
            );
    }

    @UseGuards(YandexGuard)
    @Get('yandex')
    yandexAuth() {}

    @UseGuards(YandexGuard)
    @Get('yandex/callback')
    yandexAuthCallback(@Req() req: Request, @Res() res: Response) {
        const token = req.user['accessToken'];
        return res.redirect(
            `http://localhost:3000/api/auth/success-yandex?token=${token}`,
        );
    }

    @Get('success-yandex')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    successYandex(@Query('token') token: string, @Res() res: Response) {
        return this.httpService
            .get(
                `https://login.yandex.ru/info?format=json&oauth_token=${token}`,
            )
            .pipe(
                mergeMap(({ data: { default_email } }) =>
                    this.authService.providerAuth(
                        default_email,
                        ProvidersEnums.YANDEX,
                    ),
                ),
                map((data) => this.setRefreshTokenToCookies(data, res)),
                handleTimeoutAndErrors(),
            );
    }
}
