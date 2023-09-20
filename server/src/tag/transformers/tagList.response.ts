import { Tag } from '@prisma/client';

export class TagListResponse {
    constructor(tagList: Tag[]) {
        return tagList.map((tag) => tag.name);
    }
}
