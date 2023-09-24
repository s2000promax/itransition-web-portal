import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AboutContentService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAboutContent(language: string) {
        try {
            const foundedContent =
                await this.prismaService.aboutContent.findFirst({
                    where: {
                        language,
                    },
                    include: {
                        blocks: true,
                    },
                });

            return foundedContent;
        } catch (e) {
            console.log(e);
        }
    }
}
