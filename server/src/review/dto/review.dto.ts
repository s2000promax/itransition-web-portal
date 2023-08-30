import { Review } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto implements Review {
    id: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Review title',
    })
    title: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Review subtitle',
    })
    subtitle: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Review cover (image link)',
    })
    cover: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Review text preview',
    })
    preview: string;

    createdAt: Date;
    updatedAt: Date;
    likesCount: number;
    averageRating: number;
    viewCount: number;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Review owner ID',
    })
    ownerUserId: string;
}
