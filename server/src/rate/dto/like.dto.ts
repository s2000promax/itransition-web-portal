import { Like } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class LikeDto implements Like {
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

    createdAt: Date;
}
