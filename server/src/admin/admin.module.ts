import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserService } from '../user/user.service';

@Module({
    imports: [],
    controllers: [AdminController],
    providers: [AdminService, UserService],
    exports: [AdminService],
})
export class AdminModule {}
