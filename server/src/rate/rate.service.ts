import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LikeDto, RateDto } from './dto';

@Injectable()
export class RateService {
    constructor(private prismaService: PrismaService) {}

    async updateWorkRate(body: RateDto) {
        const { rate, feedback, userId, workId } = body;
        try {
            await this.prismaService.usersRating.upsert({
                where: {
                    userId_workId: {
                        workId,
                        userId,
                    },
                },
                update: {
                    rate,
                    feedback,
                },
                create: {
                    userId,
                    workId,
                    rate,
                    feedback,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async updateReviewLike(body: LikeDto) {
        const { userId, reviewId } = body;
        try {
            const q = await this.prismaService.like.upsert({
                where: {
                    userId_reviewId: {
                        userId,
                        reviewId,
                    },
                },
                update: {
                    userId,
                    reviewId,
                },
                create: {
                    userId,
                    reviewId,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async updateAverageUsersRating(workId: string) {
        try {
            const ratings = await this.prismaService.usersRating.findMany({
                where: { workId },
                select: { rate: true },
            });

            const totalRating = ratings.reduce(
                (sum, rating) => sum + rating.rate,
                0,
            );
            const averageRating = ratings.length
                ? totalRating / ratings.length
                : 0;

            await this.prismaService.work.update({
                where: { id: workId },
                data: { averageUsersRating: averageRating },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async updateAverageReviewsRating(workId: string) {
        try {
            const reviews = await this.prismaService.review.findMany({
                where: { workId },
                select: { ownerRating: true },
            });

            const totalReviewRating = reviews.reduce(
                (sum, review) => sum + (review.ownerRating || 0),
                0,
            );
            const averageReviewRating = reviews.length
                ? totalReviewRating / reviews.length
                : 0;

            await this.prismaService.work.update({
                where: { id: workId },
                data: { averageReviewsRating: averageReviewRating },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async findFeedbackList(workId: string) {
        try {
            const foundedFeedbackList =
                await this.prismaService.usersRating.findMany({
                    where: {
                        workId,
                    },
                    include: {
                        user: true,
                    },
                });

            return foundedFeedbackList;
        } catch (e) {
            console.log(e);
        }
    }
}
