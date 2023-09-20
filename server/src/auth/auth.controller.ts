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

import { Request, Response } from 'express';

import { Cookie, Public } from '../libs/decorators';
import { LoginDto, RegisterDto } from './dto';
import { CookiesEnums } from '../config/enums/cookies.enums';
import { ProvidersEnums } from '../config/enums/providers.enums';
import { TokensInterface } from '../config/types/auth/tokens.interface';
import { ApiTags } from '@nestjs/swagger';
import { FacebookGuard, GoogleGuard, YandexGuard } from './guards';

import { handleTimeoutAndErrors } from '../libs/helpers';
import appConfig from '../config/app/appConfig';
import { UserService } from '../user/user.service';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() dto: RegisterDto, @Res() res: Response) {
        try {
            await this.authService.register(dto);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException(
                `Failed to register user with data: ${JSON.stringify(dto)}`,
            );
        }
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res() res: Response) {
        try {
            const tokens = await this.authService.login(dto);

            if (!tokens) {
                throw new BadRequestException(
                    `Failed to login with data: ${JSON.stringify(dto)}`,
                );
            }

            this.setRefreshTokenToCookies(tokens, res);
        } catch (e) {
            throw new BadRequestException(
                `Failed to login with data: ${JSON.stringify(dto)}`,
            );
        }
    }

    @Get('logout')
    async logout(
        @Cookie(CookiesEnums.REFRESH_TOKEN) refreshToken: string,
        @Res() res: Response,
    ) {
        try {
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
        } catch (e) {
            throw new BadRequestException('Failed logout');
        }
    }

    @Get('refresh-tokens')
    async refreshTokens(
        @Cookie(CookiesEnums.REFRESH_TOKEN) refreshToken: string,
        @Res() res: Response,
    ) {
        try {
            if (!refreshToken) {
                throw new UnauthorizedException();
            }

            const tokens = await this.authService.refreshTokens(refreshToken);

            if (!tokens) {
                throw new UnauthorizedException();
            }

            this.setRefreshTokenToCookies(tokens, res);
        } catch (e) {
            throw new BadRequestException('Failed to get refresh token');
        }
    }

    private setRefreshTokenToCookies(tokens: TokensInterface, res: Response) {
        try {
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
        } catch (e) {
            throw new BadRequestException('Failed to set token');
        }
    }

    @UseGuards(GoogleGuard)
    @Get('google')
    googleAuth() {}

    @UseGuards(GoogleGuard)
    @Get('google/callback')
    googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        const token = req.user['accessToken'];

        return res.redirect(
            `${
                appConfig().clientDomain
            }/success_auth_provider?provider=google&token=${token}`,
        );
    }

    @Get('success-google')
    async successGoogle(@Query('token') token: string, @Res() res: Response) {
        return this.httpService
            .get(
                `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
            )
            .pipe(
                mergeMap(async ({ data }) => {
                    if (!data.email || !data.sub) {
                        throw new BadRequestException('Email is required');
                    }

                    const profileResponse = await this.httpService
                        .get(
                            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
                        )
                        .toPromise();

                    const profileData = profileResponse.data;

                    const authResult = await this.authService.providerAuth(
                        data.email,
                        ProvidersEnums.GOOGLE,
                    );

                    await this.userService.save({
                        email: data.email,
                        firstName: profileData?.given_name,
                        lastName: profileData?.family_name,
                        avatar: profileData?.picture,
                    });

                    return authResult;
                }),
                map((data) => {
                    this.setRefreshTokenToCookies(data, res);
                }),
                handleTimeoutAndErrors(),
            );
    }

    @UseGuards(FacebookGuard)
    @Get('facebook')
    faceBookAuth() {}

    @UseGuards(FacebookGuard)
    @Get('facebook/callback')
    faceBookAuthCallback(@Req() req: Request, @Res() res: Response) {
        const token = req.user['accessToken'];

        return res.redirect(
            `${
                appConfig().clientDomain
            }/success_auth_provider?provider=facebook&token=${token}`,
        );
    }

    @Get('success-facebook')
    async successFaceBook(@Query('token') token: string, @Res() res: Response) {
        const appAccessToken = `${process.env.FACEBOOK_CLIENT_ID}|${process.env.FACEBOOK_CLIENT_SECRET}`;
        return this.httpService
            .get(`https://graph.facebook.com/debug_token`, {
                params: {
                    input_token: token,
                    access_token: appAccessToken,
                },
            })
            .pipe(
                mergeMap(({ data: { data } }) => {
                    if (data.is_valid) {
                        return this.httpService
                            .get(`https://graph.facebook.com/me`, {
                                params: { access_token: token },
                            })
                            .pipe(
                                mergeMap(({ data }) => {
                                    if (data.id) {
                                        const userId = data.id;
                                        return this.httpService
                                            .get(
                                                `https://graph.facebook.com/${userId}`,
                                                {
                                                    params: {
                                                        fields: 'email,first_name,last_name,picture.type(large)',
                                                        access_token: token,
                                                    },
                                                },
                                            )
                                            .pipe(
                                                mergeMap(
                                                    async ({
                                                        data: userData,
                                                    }) => {
                                                        const authData =
                                                            await this.authService.providerAuth(
                                                                userData.email,
                                                                ProvidersEnums.FACEBOOK,
                                                            );

                                                        const user =
                                                            await this.userService.save(
                                                                {
                                                                    email: userData.email,
                                                                    firstName:
                                                                        userData?.first_name,
                                                                    lastName:
                                                                        userData?.last_name,
                                                                    avatar: userData
                                                                        ?.picture
                                                                        ?.data
                                                                        ?.url,
                                                                },
                                                            );

                                                        return {
                                                            authData,
                                                            user,
                                                        };
                                                    },
                                                ),
                                                map((data) => {
                                                    this.setRefreshTokenToCookies(
                                                        data.authData,
                                                        res,
                                                    );
                                                }),
                                            );
                                    } else {
                                        throw new UnauthorizedException(
                                            'Invalid token',
                                        );
                                    }
                                }),
                            );
                    } else {
                        throw new UnauthorizedException('Invalid token');
                    }
                }),
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
            `${
                appConfig().clientDomain
            }/success_auth_provider?provider=yandex&token=${token}`,
        );
    }

    @Get('success-yandex')
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
