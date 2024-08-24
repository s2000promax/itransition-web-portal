import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { Response } from 'express';

import { Public } from '../libs/decorators';
import { ApiTags } from '@nestjs/swagger';
import { GoService } from './go.service';
import { firstValueFrom } from 'rxjs';

@ApiTags('go')
@Public()
@Controller('go')
export class GoController {
    baseUrl = 'http://b2b-api.go.yandex.ru/integration/2.0';

    constructor(
        private readonly goService: GoService,
        private readonly httpService: HttpService,
    ) {}

    @Post('users/getAll')
    async usersGetAll(@Body() dto: { token: string }, @Res() res: Response) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.baseUrl + '/users', { headers }),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Error while fetching users',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('managers/getAll')
    async managersGetAll(@Body() dto: { token: string }, @Res() res: Response) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.baseUrl + '/managers/list', {
                    headers,
                }),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Error while fetching users',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('cost_centers/getAll')
    async costCentersGetAll(
        @Body() dto: { token: string },
        @Res() res: Response,
    ) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.baseUrl + '/cost_centers/list', {
                    headers,
                }),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Error while fetching users',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('departments/getAll')
    async departmentsGetAll(
        @Body() dto: { token: string },
        @Res() res: Response,
    ) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.baseUrl + '/departments/list', {
                    headers,
                }),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Error while fetching users',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('orders/getAll')
    async ordersGetAll(@Body() dto: { token: string }, @Res() res: Response) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.get(this.baseUrl + '/orders/list', {
                    headers,
                }),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Error while fetching users',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
