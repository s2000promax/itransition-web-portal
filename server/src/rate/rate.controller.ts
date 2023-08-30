import { Body, Controller, Post } from '@nestjs/common';
import { RateService } from './rate.service';
import { ApiBody } from '@nestjs/swagger';
import { RateDto } from './dto';
import { Like, UsersRating } from '@prisma/client';
import { LikeDto } from './dto/like.dto';

@Controller('rate')
export class RateController {
    constructor(private rateService: RateService) {}

    @Post('feedback')
    @ApiBody({ type: RateDto })
    async createComment(@Body() rateDto: RateDto): Promise<UsersRating> {
        return await this.rateService.createFeedback(rateDto);
    }

    @Post('like')
    @ApiBody({ type: LikeDto })
    async addLike(@Body() likeDto: LikeDto): Promise<Like> {
        return await this.rateService.addLike(likeDto);
    }
}
