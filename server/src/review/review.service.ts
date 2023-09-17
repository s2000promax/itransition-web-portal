import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlockTypeEnum, ReviewTypeEnum } from '@prisma/client';
import { ReviewDto } from './dto';
import { JwtPayload } from '../config/types/auth/jwtPayload';

@Injectable()
export class ReviewService {
    constructor(private prismaService: PrismaService) {}

    async create(review: ReviewDto) {
        try {
            const createdReview = await this.prismaService.review.create({
                data: {
                    ownerId: review.ownerId,
                    workId: review.workId,
                    title: review.title,
                    workTitle: review.workTitle,
                    cover: review.cover,
                    type: review.type,
                    ownerRating: review.ownerRating,
                    viewCounter: 0,

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

    async findById(reviewId: string) {
        try {
            await this.updateUserLikesByReview(reviewId);

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
                    owner: true,
                },
            });

            return foundedReview;
        } catch (e) {
            console.log(e);
        }
    }

    async findReviewList(
        limit: string,
        page: string,
        sort: string,
        order: string,
        search: string,
        type: ReviewTypeEnum,
    ) {
        const _limit = Number(limit);
        const _page = Number(page);
        const _skip = (_page - 1) * _limit;
        const _sort = sort ?? 'createdAt';
        const _order = order ?? 'asc';
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
                    owner: true,
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
                orderBy: {
                    [_sort]: _order === 'asc' ? 'asc' : 'desc',
                },
            });

            return foundedReviews;
        } catch (error) {
            console.log(error);
        }
    }

    async updateViewCounter(reviewId: string, user: JwtPayload) {
        try {
            const foundedReview = await this.prismaService.review.findFirst({
                where: {
                    id: reviewId,
                },
                include: {
                    owner: true,
                },
            });

            if (user && user.id !== foundedReview.owner.id) {
                const uniqueView =
                    await this.prismaService.uniqueViews.findUnique({
                        where: {
                            userId_reviewId: {
                                userId: user.id,
                                reviewId: reviewId,
                            },
                        },
                    });

                if (!uniqueView) {
                    await this.prismaService.$transaction([
                        this.prismaService.uniqueViews.create({
                            data: {
                                userId: user.id,
                                reviewId: reviewId,
                            },
                        }),
                        this.prismaService.review.update({
                            where: { id: reviewId },
                            data: { viewCounter: { increment: 1 } },
                        }),
                    ]);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    private async updateUserLikesByReview(reviewId: string) {
        try {
            const review = await this.prismaService.review.findUnique({
                where: { id: reviewId },
                select: { ownerId: true },
            });

            if (review) {
                const ownerId = review.ownerId;

                const likesCount = await this.prismaService.like.count({
                    where: {
                        reviewId: reviewId,
                        review: {
                            ownerId: ownerId,
                        },
                    },
                });

                await this.prismaService.user.update({
                    where: { id: ownerId },
                    data: { likesCounter: likesCount },
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
}
