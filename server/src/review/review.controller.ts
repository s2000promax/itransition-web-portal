import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiBody } from '@nestjs/swagger';
import { ReviewDto } from './dto';
import { Like, Review, UsersRating } from '@prisma/client';

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {}

    @Post('create')
    @ApiBody({ type: ReviewDto })
    async createReview(@Body() reviewDto: ReviewDto) {}

    @Put('update')
    @ApiBody({ type: ReviewDto })
    async updateReview(@Body() reviewDto: ReviewDto) {}

    @Put('delete')
    @ApiBody({ type: ReviewDto })
    async deleteReview(@Body() reviewDto: ReviewDto) {}

    @Get('all')
    async getAllReviews() {}
}
