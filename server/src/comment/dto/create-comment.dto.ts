import { Comment } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentDto implements Comment {
    id: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Comment content',
    })
    content: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Comment owner ID',
    })
    userId: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Review ID',
    })
    reviewId: string;

    createdAt: Date;
}
