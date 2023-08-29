import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UnauthorizedException,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { Response } from 'express';

import { Cookie, Public } from '../libs/decorators';
import { UserResponse } from '../user/responses';
import { LoginDto, RegisterDto } from './dto';
import { CookiesEnums } from '../config/types/cookies/cookiesEnums';
import { TokensInterface } from '../config/types/auth/tokens.interface';
import { ApiTags } from '@nestjs/swagger';

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
    async register(@Body() dto: RegisterDto) {
        const user = await this.authService.register(dto);
        if (!user) {
            throw new BadRequestException(
                `Failed to register user with data: ${JSON.stringify(dto)}`,
            );
        }
        return new UserResponse(user);
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
}
