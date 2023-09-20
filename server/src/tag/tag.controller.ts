import { BadRequestException, Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { Public } from '../libs/decorators/index';
import { TagListResponse } from './transformers';

@Public()
@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {}

    @Get()
    async getTagList() {
        try {
            const foundedTagList = await this.tagService.getTagList();
            return new TagListResponse(foundedTagList);
        } catch (e) {
            throw new BadRequestException('Failed to get tag list');
        }
    }
}
