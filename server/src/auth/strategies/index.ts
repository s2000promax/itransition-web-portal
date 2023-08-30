import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { YandexStrategy } from './strategies/yandex.strategy';

export const STRATEGIES = [JwtStrategy, GoogleStrategy, YandexStrategy];
