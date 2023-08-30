import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { options } from './config';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync(options()),
        UserModule,
        HttpModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, ...STRATEGIES, ...GUARDS],
})
export class AuthModule {}
