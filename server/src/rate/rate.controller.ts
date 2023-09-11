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
import { RateDto } from './dto';
import { Response } from 'express';

@Controller('rate')
export class RateController {
    constructor(private rateService: RateService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('reviewRate')
    async getReviewRateById(
        @Query('reviewId') reviewId: string,
        @Query('userId') userId: string,
    ) {
        try {
            const foundedReviewRate = await this.rateService.findReviewRateById(
                reviewId,
                userId,
            );

            // const commentListResponse = foundedCommentList.map(
            //     (comment) => new CommentResponse(comment, comment.user),
            // );
            console.log(foundedReviewRate);
            return foundedReviewRate;
        } catch (e) {
            throw new BadRequestException('Failed to fetch rating');
        }
    }

    @Post()
    async rateReview(@Body() body: RateDto, @Res() res: Response) {
        try {
            await this.rateService.updateReviewRate(body);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to rate Review');
        }
    }
}
