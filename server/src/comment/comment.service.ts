import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const { content, userId, reviewId } = createCommentDto;

        return this.prisma.comment.create({
            data: {
                content,
                userId,
                reviewId,
            },
        });
    }
}
