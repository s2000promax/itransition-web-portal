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
import { ReviewResponse, UserResponse } from './responses';

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

    @Get('all')
    async getAllReviews() {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOneUser(
        @Param('id') id: string,
        @Query('_expand') expand: string,
    ) {
        // const review = await this.reviewService.findById(id);

        const review: Review = {
            id: '123123',
            ownerId: 'd2c2c6f4-5de9-433a-ad4a-58c8cd4c559c',
            title: 'Test Review',
            subtitle: 'sdfdsfdsfsd',
            cover: '',
            type: ReviewTypeEnum.ALL,
            ownerRating: 7,
            averageRating: 4,
            likesCount: BigInt(33),
            viewCount: BigInt(234),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        if (expand === 'user') {
            const user = await this.userService.findById(review.ownerId);
            return {
                ...new ReviewResponse(review),
                user: new UserResponse(user),
            };
        }

        return new ReviewResponse(review);
    }
}
