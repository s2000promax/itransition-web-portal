import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleGuard } from './guards/google.guard';
import { YandexGuard } from './guards/yandex.guard';
import { FacebookGuard } from './guards/facebook.guard';

export const GUARDS = [JwtAuthGuard, GoogleGuard, FacebookGuard, YandexGuard];

export { JwtAuthGuard } from './guards/jwt-auth.guard';
export { GoogleGuard } from './guards/google.guard';
export { FacebookGuard } from './guards/facebook.guard';
export { YandexGuard } from './guards/yandex.guard';
