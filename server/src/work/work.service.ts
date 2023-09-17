import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewTypeEnum, User, Work } from '@prisma/client';
import { WorkDto } from './dto';

@Injectable()
export class WorkService {
    constructor(private prismaService: PrismaService) {}

    async create(work: WorkDto) {
        try {
            const createdWork = await this.prismaService.work.create({
                data: {
                    title: work.title,
                    author: work.author,
                    cover: work.cover,
                    description: work.description,
                    type: work.type ?? 'ALL',
                    averageUsersRating: 0,
                    averageReviewsRating: 0,
                },
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async save(work: Work) {
        try {
            const savedWork = await this.prismaService.work.upsert({
                where: {
                    id: work.id,
                },
                update: {
                    title: work.title ?? undefined,
                    author: work.author ?? undefined,
                    cover: work.cover ?? undefined,
                    description: work.description ?? undefined,
                    type: work.type ?? undefined,
                },
                create: {
                    title: work.title ?? '',
                    author: work.author ?? '',
                    cover: work.cover ?? '',
                    description: work.description ?? '',
                    type: work.type ?? 'ALL',
                },
            });

            return savedWork;
        } catch (e) {
            console.log(e);
        }
    }

    async findById(workId: string, expand?: string) {
        try {
            const foundedWork = await this.prismaService.work.findFirst({
                where: {
                    id: workId,
                },
            });

            return foundedWork;
        } catch (e) {
            console.log(e);
        }
    }

    async findWorkList(
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
        const _sort = sort;
        const _order = order;
        const _search = search;
        const _type = type === ReviewTypeEnum.ALL ? undefined : type;

        try {
            const foundedWorkList = await this.prismaService.work.findMany({
                skip: _skip,
                take: _limit,
                where: {
                    type: _type,
                },
                orderBy: {
                    [_sort]: _order === 'asc' ? 'asc' : 'desc',
                },
            });

            return foundedWorkList;
        } catch (error) {
            console.log(error);
        }
    }
}
