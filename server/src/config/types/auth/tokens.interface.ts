import { Token } from '@prisma/client';

export interface TokensInterface {
    accessToken: string;
    refreshToken: Token;
}
