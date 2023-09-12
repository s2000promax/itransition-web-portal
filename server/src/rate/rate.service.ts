import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RateDto, LikeDto } from './dto';
import { Like, UsersRating } from '@prisma/client';

@Injectable()
export class RateService {
    constructor(private prisma: PrismaService) {}

    async findReviewRateById(workId: string, userId: string) {
        try {
            const foundedReviewRate = await this.prisma.usersRating.findFirst({
                where: {
                    workId,
                    userId,
                },
            });

            return foundedReviewRate;
        } catch (e) {
            console.log(e);
        }
    }

    async updateReviewRate(body: RateDto) {
        const { rate, feedback, userId, workId } = body;
        try {
            await this.prisma.usersRating.upsert({
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
