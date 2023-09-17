import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    async createComment(body: CreateCommentDto) {
        const { content, userId, reviewId } = body;

        try {
            await this.prisma.comment.create({
                data: {
                    content,
                    userId,
                    reviewId,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async findCommentsByReviewId(reviewId: string) {
        try {
            const foundedComments = await this.prisma.comment.findMany({
                where: {
                    reviewId: reviewId,
                },
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            return foundedComments;
        } catch (e) {
            console.log(e);
        }
    }
}
