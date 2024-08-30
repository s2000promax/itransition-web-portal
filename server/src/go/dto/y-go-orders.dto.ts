import { YGoCommonDto } from './y-go-common.dto';

export class YgoRouteStats extends YGoCommonDto {
    route: number[][];
    user_id: string;
}

export class YgoOrderCreate extends YGoCommonDto {
    x_idempotency_token: string;
    user_id: string;
    due_date?: string;
    route: {
        geopoint: number[];
        fullname: string;
    }[];
    class: 'econom';
    offer: string;
    requirements?: {
        id: string;
        title: string;
        value: string;
    };
    cost_center_values?: {}[];
    comment?: string;
}

export class YgoCurrentOrder extends YGoCommonDto {
    order_id: string;
    code?: string;
    message?: string;
    state?: string;
}
