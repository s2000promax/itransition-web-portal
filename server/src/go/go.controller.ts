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
import { YgoUser } from './dto/y-go-user.dto';
import { YGoCommonDto } from './dto/y-go-common.dto';
import {
    YgoCurrentOrder,
    YgoOrderCreate,
    YgoRouteStats,
} from './dto/y-go-orders.dto';

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
    async usersGetAll(@Body() dto: YGoCommonDto, @Res() res: Response) {
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
            const errResponse = {
                ...error.response.data,
                status: error.response.status,
            };
            return res.status(error.response.status).json(errResponse);
        }
    }

    @Post('users/create')
    async usersCreate(@Body() dto: YgoUser, @Res() res: Response) {
        console.log('users/create', dto);
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    this.baseUrl + '/users',
                    JSON.stringify(dto),
                    {
                        headers,
                    },
                ),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            const errResponse = {
                ...error.response.data,
                status: error.response.status,
            };
            console.log(error.response.status);
            return res.status(error.response.status).json(errResponse);
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
            const errResponse = {
                ...error.response.data,
                status: error.response.status,
            };
            return res.status(error.response.status).json(errResponse);
        }
    }

    @Post('orders/getAll')
    async ordersGetAll(
        @Body()
        dto: {
            token: string;
            limit: number;
            offset: number;
            sortingDirection: number;
        },
        @Res() res: Response,
    ) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    this.baseUrl +
                        `/orders/list?limit=${dto.limit}&offset=${dto.offset}&sorting_direction=${dto.sortingDirection}`,
                    {
                        headers,
                    },
                ),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            const errResponse = {
                ...error.response.data,
                status: error.response.status,
            };
            return res.status(error.response.status).json(errResponse);
        }
    }

    @Post('orders/info')
    async ordersInfo(@Body() dto: YgoRouteStats, @Res() res: Response) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    this.baseUrl + '/orders/routestats',
                    JSON.stringify(dto),
                    {
                        headers,
                    },
                ),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            const errResponse = {
                ...error.response.data,
                status: error.response.status,
            };
            return res.status(error.response.status).json(errResponse);
        }
    }

    @Post('orders/create')
    async ordersCreate(@Body() dto: YgoOrderCreate, @Res() res: Response) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
            'X-Idempotency-Token': dto.x_idempotency_token,
        };
        delete dto.token;
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    this.baseUrl + '/orders/create',
                    JSON.stringify(dto),
                    {
                        headers,
                    },
                ),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            const errResponse = {
                ...error.response.data,
                status: error.response.status,
            };
            return res.status(error.response.status).json(errResponse);
        }
    }

    @Post('orders/progress')
    async ordersProgress(@Body() dto: YgoCurrentOrder, @Res() res: Response) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    this.baseUrl + '/orders/progress?order_id=' + dto.order_id,
                    {
                        headers,
                    },
                ),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            const errResponse = {
                ...error.response.data,
                status: error.response.status,
            };
            return res.status(error.response.status).json(errResponse);
        }
    }

    @Post('orders/status')
    async ordersStatus(@Body() dto: YgoCurrentOrder, @Res() res: Response) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    this.baseUrl + '/orders/info?order_id=' + dto.order_id,
                    {
                        headers,
                    },
                ),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            const errResponse = {
                ...error.response.data,
                status: error.response.status,
            };
            return res.status(error.response.status).json(errResponse);
        }
    }

    @Post('orders/cancel')
    async ordersCancel(@Body() dto: YgoCurrentOrder, @Res() res: Response) {
        const token = dto.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    this.baseUrl + '/orders/cancel?order_id=' + dto.order_id,
                    {
                        state: dto.state,
                    },
                    {
                        headers,
                    },
                ),
            );
            return res.status(HttpStatus.OK).json(response.data);
        } catch (error) {
            const errResponse = {
                ...error.response.data,
                status: error.response.status,
            };
            return res.status(error.response.status).json(errResponse);
        }
    }
}
