import { Like } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class LikeDto implements Partial<Like> {
    @ApiProperty({
        type: Boolean,
        description: 'Review Like',
    })
    like: boolean;

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
