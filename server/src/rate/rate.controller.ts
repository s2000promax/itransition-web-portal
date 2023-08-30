import { Body, Controller, Post } from '@nestjs/common';
import { RateService } from './rate.service';
import { ApiBody } from '@nestjs/swagger';
import { RateDto } from './dto';
import { UsersRating } from '@prisma/client';

@Controller('rate')
export class RateController {
    constructor(private rateService: RateService) {}

    @Post('feedback')
    @ApiBody({ type: RateDto })
    async createComment(@Body() rateDto: RateDto): Promise<UsersRating> {
        return await this.rateService.createFeedback(rateDto);
    }
}
