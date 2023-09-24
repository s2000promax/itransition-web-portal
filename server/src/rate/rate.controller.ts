import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpStatus,
    Post,
    Query,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { LikeDto, RateDto } from './dto';
import { Response } from 'express';
import { Public } from '../libs/decorators';
import { FeedbackListResponse } from './transformers';

@Controller('rate')
export class RateController {
    constructor(private rateService: RateService) {}

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('feedbackList')
    async getFeedbackList(@Query('_workId') workId: string) {
        try {
            const foundedFeedbackList =
                await this.rateService.findFeedbackList(workId);
            const feedbackListResponse = foundedFeedbackList.map((feedback) => {
                return new FeedbackListResponse(feedback, feedback.user);
            });
            return feedbackListResponse;
        } catch (e) {
            throw new BadRequestException(`Failed to get feedbackList`);
        }
    }

    @Post('work')
    async rateWork(@Body() body: RateDto, @Res() res: Response) {
        try {
            await this.rateService.updateWorkRate(body);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to rate Work');
        } finally {
            await this.rateService.updateAverageUsersRating(body.workId);
            await this.rateService.updateAverageReviewsRating(body.workId);
        }
    }

    @Post('review')
    async likeReview(@Body() body: LikeDto, @Res() res: Response) {
        try {
            await this.rateService.updateReviewLike(body);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to like Review');
        }
    }
}
