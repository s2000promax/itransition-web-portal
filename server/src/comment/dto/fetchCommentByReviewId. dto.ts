import { ApiProperty } from '@nestjs/swagger';

export class FetchCommentByReviewIdDto {
    @ApiProperty({
        required: true,
        type: String,
        description: 'Review ID',
    })
    reviewId: string;

    @ApiProperty({
        type: String,
        description: '_expand === user',
    })
    expand: string;
}
