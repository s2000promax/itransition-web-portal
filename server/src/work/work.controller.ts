import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { ApiBody } from '@nestjs/swagger';
import { WorkDto } from './dto';
import { ReviewTypeEnum, Work } from '@prisma/client';
import { Response } from 'express';

import { Public } from '../libs/decorators';

@Controller('work')
export class WorkController {
    constructor(private workService: WorkService) {}

    @Post('create')
    @ApiBody({ type: WorkDto })
    async createWork(@Body() work: WorkDto, @Res() res: Response) {
        try {
            await this.workService.create(work);

            res.status(HttpStatus.OK).send();
        } catch (e) {
            throw new BadRequestException(`Failed to create work`);
        }
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('workList')
    async getReviewList(
        @Query('_limit') limit: string,
        @Query('_page') page: string,
        @Query('_sort') sort: string,
        @Query('_order') order: string,
        @Query('q') search: string,
        @Query('type') type: ReviewTypeEnum,
    ) {
        try {
            const foundedWorkList = await this.workService.findWorkList(
                limit,
                page,
                sort,
                order,
                search,
                type,
            );

            return foundedWorkList;
        } catch (e) {
            throw new BadRequestException(`Failed to find works`);
        }
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOneWork(
        @Param('id') id: string,
        @Query('_expand') expand: string,
    ) {
        try {
            const foundedWork = await this.workService.findById(id, expand);

            return foundedWork;
        } catch (e) {
            throw new BadRequestException(`Failed to find work`);
        }
    }

    @Put()
    async updateWork(@Body() body: Work) {
        try {
            const updatedWork = await this.workService.save(body);

            const foundedUpdatedWork = await this.workService.findById(
                updatedWork.id,
            );

            return foundedUpdatedWork;
        } catch (e) {
            throw new BadRequestException('Failed to update work');
        }
    }
}
