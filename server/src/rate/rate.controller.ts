import {
    BadRequestException,
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { LikeDto, RateDto } from './dto';
import { Response } from 'express';

@Controller('rate')
export class RateController {
    constructor(private rateService: RateService) {}

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
