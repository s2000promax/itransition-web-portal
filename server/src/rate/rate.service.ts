import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RateDto, LikeDto } from './dto';
import { Like, UsersRating } from '@prisma/client';

@Injectable()
export class RateService {
    constructor(private prisma: PrismaService) {}

    async findReviewRateById(reviewId: string, userId: string) {
        try {
            const foundedReviewRate = await this.prisma.usersRating.findFirst({
                where: {
                    reviewId,
                    userId,
                },
            });

            return foundedReviewRate;
        } catch (e) {
            console.log(e);
        }
    }

    async updateReviewRate(body: RateDto) {
        const { rate, feedback, userId, reviewId } = body;
        try {
            await this.prisma.usersRating.upsert({
                where: {
                    userId_reviewId: {
                        userId,
                        reviewId,
                    },
                },
                update: {
                    rate,
                    feedback,
                },
                create: {
                    userId,
                    reviewId,
                    rate,
                    feedback,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async addLike(likeDto: LikeDto): Promise<Like> {
        const { userId, reviewId } = likeDto;

        return this.prisma.like.create({
            data: {
                userId,
                reviewId,
            },
        });
    }
}
