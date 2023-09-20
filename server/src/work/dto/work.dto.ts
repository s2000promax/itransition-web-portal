import { ReviewTypeEnum, Work } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class WorkDto implements Work {
    id: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Work title',
    })
    title: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Author of Work',
    })
    author: string;

    @ApiProperty({
        required: true,
        type: Date,
        description: 'Date of the release',
    })
    releaseDate: Date;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Work description',
    })
    description: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Work cover (image link)',
    })
    cover: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Work type',
    })
    type: ReviewTypeEnum;
    averageUsersRating: number;
    averageReviewsRating: number;
}
