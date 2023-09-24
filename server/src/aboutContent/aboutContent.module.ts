import { Module } from '@nestjs/common';
import { AboutContentService } from './aboutContent.service';
import { AboutContentController } from './aboutContent.controller';
import { UserService } from '../user/user.service';

@Module({
    imports: [],
    controllers: [AboutContentController],
    providers: [AboutContentService],
    exports: [AboutContentService],
})
export class AboutContentModule {}
