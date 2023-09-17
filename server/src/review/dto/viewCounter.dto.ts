import { ApiProperty } from '@nestjs/swagger';

export class ViewCounterDto {
    @ApiProperty({
        required: true,
        type: String,
        description: 'Review ID',
    })
    reviewId: string;
}
