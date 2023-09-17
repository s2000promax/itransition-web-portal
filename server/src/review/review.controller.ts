import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiBody } from '@nestjs/swagger';
import { ReviewDto, ViewCounterDto } from './dto';
import { ReviewTypeEnum } from '@prisma/client';
import { ReviewResponse } from './transformers';

import { CurrentUser, Public } from '../libs/decorators';
import { JwtPayload } from '../config/types/auth/jwtPayload';
import { Response } from 'express';

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {}

    @Post('create')
    @ApiBody({ type: ReviewDto })
    async createReview(@Body() reviewDto: ReviewDto) {
        await this.reviewService.create(reviewDto);
    }

    @Put('update')
    @ApiBody({ type: ReviewDto })
    async updateReview(@Body() reviewDto: ReviewDto) {}

    @Put('delete')
    @ApiBody({ type: ReviewDto })
    async deleteReview(@Body() reviewDto: ReviewDto) {}

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('reviewList')
    async getReviewList(
        @Query('_limit') limit: string,
        @Query('_page') page: string,
        @Query('_sort') sort: string,
        @Query('_order') order: string,
        @Query('q') search: string,
        @Query('type') type: ReviewTypeEnum,
    ) {
        console.log(limit, page, sort, order, type);
        const foundedReviewList = await this.reviewService.findReviewList(
            limit,
            page,
            sort,
            order,
            search,
            type,
        );

        const reviewListResponse = foundedReviewList.map(
            (review) => new ReviewResponse(review, review.owner),
        );

        return reviewListResponse;
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOneReview(@Param('id') reviewId: string) {
        const review = await this.reviewService.findById(reviewId);

        const reviewResponse = new ReviewResponse(review, review.owner);

        return reviewResponse;
    }

    @ApiBody({ type: ViewCounterDto })
    @Post('counter')
    async updateViewCounter(
        @Body() body: ViewCounterDto,
        @CurrentUser() user: JwtPayload,
        @Res() res: Response,
    ) {
        try {
            await this.reviewService.updateViewCounter(body.reviewId, user);
            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to update view counter');
        }
    }
}
