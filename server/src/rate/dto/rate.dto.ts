import { UsersRating } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class RateDto implements Partial<UsersRating> {
    @ApiProperty({
        type: String,
        description: 'User feedback message',
    })
    feedback: string;

    @ApiProperty({
        required: true,
        type: Number,
        description: 'User rating (1-5)',
    })
    rating: number;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Rate owner ID',
    })
    userId: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Review ID',
    })
    reviewId: string;
}
