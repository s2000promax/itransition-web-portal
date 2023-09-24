import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Public } from '../libs/decorators';
import { ApiTags } from '@nestjs/swagger';
import { AboutContentService } from './aboutContent.service';

@ApiTags('about')
@Public()
@Controller('about')
export class AboutContentController {
    constructor(private aboutContentService: AboutContentService) {}

    @Get()
    async getContent(@Query('_lang') language: string) {
        try {
            const foundedContent =
                await this.aboutContentService.getAboutContent(language);

            return foundedContent;
        } catch (e) {
            throw new BadRequestException('Failed to get about content');
        }
    }
}
