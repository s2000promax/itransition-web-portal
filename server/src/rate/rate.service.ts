import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RateDto } from './dto';
import { UsersRating } from '@prisma/client';

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
}
