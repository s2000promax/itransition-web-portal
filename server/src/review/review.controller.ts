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
    async createReview(@Body() reviewDto: ReviewDto, @Res() res: Response) {
        try {
            await this.reviewService.create(reviewDto);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to create review');
        }
    }

    @Put('update')
    @ApiBody({ type: ReviewDto })
    async updateReview(@Body() reviewDto: ReviewDto, @Res() res: Response) {
        try {
            await this.reviewService.updateReview(reviewDto);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to update review');
        }
    }

    @Put('delete')
    @ApiBody({ type: ReviewDto })
    async deleteReview(@Body() reviewDto: ReviewDto, @Res() res: Response) {
        try {
            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException('Failed to delete review');
        }
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('recommendation/list')
    async getReviewRecommendationList(
        @Query('_reviewId') reviewId: string,
        @Query('_limit') limit: string,
        @Query('_page') page: string,
    ) {
        try {
            const foundedReviewRecommendationList =
                await this.reviewService.findReviewRecommendationList(
                    reviewId,
                    limit,
                    page,
                );

            const reviewListResponse = foundedReviewRecommendationList.map(
                (review) => new ReviewResponse(review, review.owner),
            );

            return reviewListResponse;
        } catch (e) {
            throw new BadRequestException(
                'Failed to get review recommendation list',
            );
        }
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('recommendation/byWorkId')
    async getRecommendationReviewListByWorkId(
        @Query('_workId') workId: string,
        @Query('_limit') limit: string,
        @Query('_page') page: string,
    ) {
        try {
            const foundedReviewRecommendationList =
                await this.reviewService.findRecommendationReviewListByWorkId(
                    workId,
                    limit,
                    page,
                );

            const reviewListResponse = foundedReviewRecommendationList.map(
                (review) => new ReviewResponse(review, review.owner),
            );

            return reviewListResponse;
        } catch (e) {
            throw new BadRequestException(
                'Failed to get review recommendation list',
            );
        }
    }

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
        @Query('tags') tags: string,
    ) {
        try {
            const foundedReviewList = await this.reviewService.findReviewList(
                limit,
                page,
                sort,
                order,
                search,
                type,
                tags,
            );

            const reviewListResponse = foundedReviewList.map(
                (review) => new ReviewResponse(review, review.owner),
            );

            return reviewListResponse;
        } catch (e) {
            throw new BadRequestException('Failed to get review list');
        }
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOneReview(@Param('id') reviewId: string) {
        try {
            const review = await this.reviewService.findById(reviewId);

            const reviewResponse = new ReviewResponse(
                review,
                review.owner,
                review.tags,
            );

            return reviewResponse;
        } catch (e) {
            throw new BadRequestException('Failed to get review');
        }
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
