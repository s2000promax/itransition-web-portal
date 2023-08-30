import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateCommentDto } from './dto';
import { Comment } from '@prisma/client';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post('create')
    @ApiBody({ type: CreateCommentDto })
    async createComment(
        @Body() createCommentDto: CreateCommentDto,
    ): Promise<Comment> {
        return await this.commentService.createComment(createCommentDto);
    }
}
