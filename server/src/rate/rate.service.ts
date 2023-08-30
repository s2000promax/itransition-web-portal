import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RateDto, LikeDto } from './dto';
import { Like, UsersRating } from '@prisma/client';

@Injectable()
export class RateService {
    constructor(private prisma: PrismaService) {}

    async createFeedback(rateDto: RateDto): Promise<UsersRating> {
        const { rating, feedback, userId, reviewId } = rateDto;

        return this.prisma.usersRating.create({
            data: {
                rating,
                feedback,
                userId,
                reviewId,
            },
        });
    }

    async addLike(likeDto: LikeDto): Promise<Like> {
        const { like, userId, reviewId } = likeDto;

        return this.prisma.like.create({
            data: {
                like,
                userId,
                reviewId,
            },
        });
    }
}
