import { Paragraph, Review, ReviewBlock, ReviewTypeEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

interface ReviewBlockI extends ReviewBlock {
    paragraphs: Paragraph[];
}

export class ReviewDto implements Review {
    id: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Review owner ID',
    })
    ownerId: string;

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
        description: 'Review type',
    })
    type: ReviewTypeEnum;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Owner Review rate',
    })
    ownerRating: number;

    @ApiProperty({
        required: true,
        type: [],
        description: 'Review blocks - ReviewBlock[]',
    })
    blocks: ReviewBlockI[];

    createdAt: Date;
    updatedAt: Date;
    likesCount: bigint;
    averageRating: number;
    viewCount: bigint;
}
