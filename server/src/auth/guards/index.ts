import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleGuard } from './guards/google.guard';
import { YandexGuard } from './guards/yandex.guard';

export const GUARDS = [JwtAuthGuard, GoogleGuard, YandexGuard];

export { JwtAuthGuard } from './guards/jwt-auth.guard';
export { GoogleGuard } from './guards/google.guard';
export { YandexGuard } from './guards/yandex.guard';
