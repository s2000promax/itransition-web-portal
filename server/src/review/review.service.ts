import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    BlockTypeEnum,
    Review,
    ReviewTypeEnum,
    ReviewBlock,
    RolesEnum,
    User,
} from '@prisma/client';
import { ReviewDto } from './dto';
import { ReviewResponse } from './responses';
import { JwtPayload } from '../config/types/auth/jwtPayload';

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

    async findById(reviewId: string, expand: string, user: JwtPayload) {
        try {
            const foundedReview = await this.prismaService.review.findFirst({
                where: {
                    id: reviewId,
                },
                include: {
                    blocks: {
                        orderBy: {
                            sortId: 'asc',
                        },
                        include: {
                            paragraphs: {
                                orderBy: {
                                    sortId: 'asc',
                                },
                            },
                        },
                    },
                    owner: expand === 'user',
                },
            });

            if (user.id !== foundedReview.ownerId) {
                await this.prismaService.review.update({
                    where: { id: reviewId },
                    data: { viewCount: { increment: 1 } },
                });
            }

            return foundedReview;
        } catch (e) {
            console.log(e);
        }
    }

    async findReviewList(
        expand: string,
        limit: string,
        page: string,
        order: string,
        search: string,
        type: ReviewTypeEnum,
        sort: string,
    ) {
        const _limit = Number(limit);
        const _page = Number(page);
        const _skip = (_page - 1) * _limit;
        const _sort = sort;
        const _order = order;
        const _search = search;
        const _type = type === ReviewTypeEnum.ALL ? undefined : type;

        try {
            const foundedReviews = await this.prismaService.review.findMany({
                skip: _skip,
                take: _limit,
                where: {
                    type: _type,
                },
                include: {
                    owner: expand === 'user',
                    blocks: {
                        orderBy: {
                            sortId: 'asc',
                        },
                        include: {
                            paragraphs: {
                                orderBy: {
                                    sortId: 'asc',
                                },
                            },
                        },
                    },
                },
            });

            return foundedReviews;
        } catch (error) {
            console.log(error);
        }
    }
}
