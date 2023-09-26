import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlockTypeEnum, Prisma, Review, ReviewTypeEnum } from '@prisma/client';
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

            await this.tagsUpdate(review.tags, createdReview).catch((e) =>
                console.log(e),
            );
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateReview(review: ReviewDto) {
        try {
            const blocksUpdateData = review.blocks.map((block) => {
                const paragraphsToUpdate = block.paragraphs!.map(
                    (paragraph) => ({
                        where: { id: paragraph.id },
                        data: {
                            sortId: paragraph.sortId,
                            content: paragraph.content,
                        },
                    }),
                );

                const blockData: Prisma.ReviewBlockUpdateWithoutReviewInput = {
                    sortId: block.sortId,
                    type: block.type,
                    title: block.title || null,
                    src: block.type === BlockTypeEnum.IMAGE ? block.src : null,
                    code: block.type === BlockTypeEnum.CODE ? block.code : null,
                    paragraphs: {
                        update: paragraphsToUpdate,
                    },
                };

                if (block.id) {
                    return {
                        where: { id: block.id },
                        data: blockData,
                    };
                }
            });

            const updatedReview = await this.prismaService.review.update({
                where: {
                    id: review.id,
                },
                data: {
                    title: review.title,
                    cover: review.cover,
                    blocks: {
                        update: blocksUpdateData,
                    },
                },
            });

            await this.tagsUpdate(review.tags, updatedReview).catch((e) =>
                console.log(e),
            );
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
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
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
        tags: string,
    ) {
        const _limit = Number(limit);
        const _page = Number(page);
        const _skip = (_page - 1) * _limit;
        const _sort = sort ?? 'createdAt';
        const _order = order ?? 'asc';
        const _search = search;
        const _type = type === ReviewTypeEnum.ALL ? undefined : type;
        const _tags = tags;

        try {
            const searchConditions = [];

            if (_search) {
                searchConditions.push(
                    { title: { contains: _search } },
                    { workTitle: { contains: _search } },
                    {
                        owner: {
                            OR: [
                                { firstName: { contains: _search } },
                                { lastName: { contains: _search } },
                            ],
                        },
                    },
                    {
                        blocks: {
                            some: {
                                OR: [
                                    { title: { contains: _search } },
                                    {
                                        paragraphs: {
                                            some: {
                                                content: {
                                                    contains: _search,
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        comments: {
                            some: { content: { contains: _search } },
                        },
                    },
                    {
                        tags: {
                            some: {
                                tag: {
                                    name: {
                                        contains: _search,
                                    },
                                },
                            },
                        },
                    },
                );
            }

            if (_tags) {
                searchConditions.push({
                    tags: {
                        some: {
                            tag: {
                                name: { contains: _tags },
                            },
                        },
                    },
                });
            }

            const foundedReviews = await this.prismaService.review.findMany({
                skip: _skip,
                take: _limit,
                where: {
                    type: _type,
                    OR: searchConditions.length ? searchConditions : undefined,
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
        } catch (e) {
            console.log(e);
        }
    }

    async findReviewRecommendationList(
        reviewId: string,
        limit: string,
        page: string,
    ) {
        const _limit = Number(limit);
        const _page = Number(page);
        const _skip = (_page - 1) * _limit;

        try {
            const currentReview = await this.prismaService.review.findUnique({
                where: { id: reviewId },
                select: { workId: true },
            });

            const currentWorkId = currentReview.workId;

            const foundedReviewsRecommendation =
                await this.prismaService.review.findMany({
                    where: {
                        workId: currentWorkId,
                        id: {
                            not: reviewId,
                        },
                    },
                    skip: _skip,
                    take: _limit,
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
                        work: {
                            select: {
                                averageUsersRating: true,
                            },
                        },
                    },
                    orderBy: {
                        work: {
                            averageUsersRating: 'desc',
                        },
                    },
                });

            return foundedReviewsRecommendation;
        } catch (e) {
            console.log(e);
        }
    }

    async findRecommendationReviewListByWorkId(
        workId: string,
        limit: string,
        page: string,
    ) {
        const _limit = Number(limit);
        const _page = Number(page);
        const _skip = (_page - 1) * _limit;

        try {
            const foundedRecommendationReviewListByWorkId =
                await this.prismaService.review.findMany({
                    where: {
                        workId: workId,
                    },
                    include: {
                        owner: true,
                    },
                    orderBy: {
                        ownerRating: 'desc',
                    },
                    skip: _skip,
                    take: _limit,
                });

            return foundedRecommendationReviewListByWorkId;
        } catch (e) {
            console.log(e);
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

    async tagsUpdate(tags: string[], updatedReview: Review) {
        for (const tagName of tags || []) {
            const tag = await this.prismaService.tag.upsert({
                where: { name: tagName },
                update: {},
                create: { name: tagName },
            });

            await this.prismaService.reviewTag.upsert({
                where: {
                    reviewId_tagId: {
                        reviewId: updatedReview.id,
                        tagId: tag.name,
                    },
                },
                create: {
                    reviewId: updatedReview.id,
                    tagId: tag.name,
                },
                update: {
                    reviewId: updatedReview.id,
                    tagId: tag.name,
                },
            });
        }
    }
}
