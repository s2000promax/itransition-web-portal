import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { YandexStrategy } from './strategies/yandex.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';

export const STRATEGIES = [
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    YandexStrategy,
];
