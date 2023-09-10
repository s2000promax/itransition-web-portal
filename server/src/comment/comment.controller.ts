import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpStatus,
    Post,
    Query,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateCommentDto } from './dto';
import { Response } from 'express';
import { CommentResponse } from './iterseptors';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post('add')
    @ApiBody({ type: CreateCommentDto })
    async addComment(@Body() body: CreateCommentDto, @Res() res: Response) {
        console.log(body);
        try {
            await this.commentService.createComment(body);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException(`Failed to add comment`);
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('commentList')
    async getCommentCommentList(
        @Query('reviewId') reviewId: string,
        @Query('_expand') expand: string,
    ) {
        console.log(reviewId, expand);
        try {
            const foundedCommentList =
                await this.commentService.findCommentsByReviewId(
                    reviewId,
                    expand,
                );

            const commentListResponse = foundedCommentList.map(
                (comment) => new CommentResponse(comment, comment.user),
            );

            return commentListResponse;
        } catch (e) {
            throw new BadRequestException(`Failed to fetch comments`);
        }
    }
}
