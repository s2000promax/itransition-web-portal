import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserService } from '../user/user.service';

@Module({
    controllers: [ReviewController],
    providers: [ReviewService, UserService],
    exports: [ReviewService],
})
export class ReviewModule {}
