import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { UserService } from '../user/user.service';

@Module({
    controllers: [WorkController],
    providers: [WorkService, UserService],
    exports: [WorkService],
})
export class WorkModule {}
