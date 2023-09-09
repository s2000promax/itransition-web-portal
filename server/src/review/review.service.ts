import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    BlockTypeEnum,
    Review,
    ReviewBlock,
    RolesEnum,
    User,
} from '@prisma/client';
import { ReviewDto } from './dto';

@Injectable()
export class ReviewService {
    constructor(private prismaService: PrismaService) {}

    async create(review: ReviewDto) {
        try {
            console.log(review);

            const createdReview = await this.prismaService.review.create({
                data: {
                    ownerId: review.ownerId,
                    title: review.title,
                    subtitle: review.subtitle,
                    cover: review.cover,
                    type: review.type,
                    ownerRating: review.ownerRating,
                    viewCount: 0,
                    likesCount: 0,
                    averageRating: 0,

                    blocks: {
                        create:
                            review.blocks && review.blocks.length > 0
                                ? review.blocks.map((block) => ({
                                      sortId: block.sortId,
                                      type: block.type,
                                      title: block.title || undefined,
                                      src:
                                          block.type === BlockTypeEnum.IMAGE
                                              ? block.src
                                              : undefined,
                                      code:
                                          block.type === BlockTypeEnum.CODE
                                              ? block.code
                                              : undefined,
                                      paragraphs:
                                          block.type === BlockTypeEnum.TEXT
                                              ? {
                                                    create:
                                                        block.paragraphs?.map(
                                                            (paragraph) => ({
                                                                sortId: paragraph.sortId,
                                                                content:
                                                                    paragraph.content,
                                                            }),
                                                        ) || [],
                                                }
                                              : undefined,
                                  }))
                                : [],
                    },
                },
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
