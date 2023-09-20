import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
    constructor(private prismaService: PrismaService) {}

    async getTagList() {
        try {
            const foundedTagList = await this.prismaService.tag.findMany();
            console.log(foundedTagList);
            return foundedTagList;
        } catch (e) {
            console.log(e);
        }
    }
}
