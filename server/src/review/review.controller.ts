import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiBody } from '@nestjs/swagger';
import { ReviewDto } from './dto';
import { Like, Review, ReviewTypeEnum, UsersRating } from '@prisma/client';

import { UserService } from '../user/user.service';
import { ReviewResponse, ReviewResponseList, UserResponse } from './responses';
import { CurrentUser } from '../libs/decorators';
import { JwtPayload } from '../config/types/auth/jwtPayload';

@Controller('review')
export class ReviewController {
    constructor(
        private reviewService: ReviewService,
        private userService: UserService,
    ) {}

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

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('reviewList')
    async getReviewList(
        @Query('_expand') expand: string,
        @Query('_limit') limit: string,
        @Query('_page') page: string,
        @Query('_sort') order: string,
        @Query('q') search: string,
        @Query('type') type: ReviewTypeEnum,
    ) {
        console.log(expand, limit, page, order, search, type);
        const foundedReviewList = await this.reviewService.findReviewList(
            expand,
            limit,
            page,
            order,
            search,
            type,
            'asc',
        );

        const reviewList = foundedReviewList.map(
            (review) => new ReviewResponse(review, review.owner),
        );

        const reviewListResponse = new ReviewResponseList(reviewList);
        return reviewListResponse.reviews;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOneReview(
        @Param('id') id: string,
        @Query('_expand') expand: string,
        @CurrentUser() user: JwtPayload,
    ) {
        const review = await this.reviewService.findById(id, expand, user);

        const reviewResponse = new ReviewResponse(review, review.owner);

        return reviewResponse;
    }
}
