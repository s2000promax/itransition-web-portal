import { YGoCommonDto } from './y-go-common.dto';

export class YgoUser extends YGoCommonDto {
    client_id: string;
    id: string;
    is_active: boolean;
    fullname: string;
    phone: string;
    is_deleted: boolean;
    cost_center: string;
    cost_centers_id: string;
    email: string;
    limits: {
        limit_id: string;
        service: 'taxi' | 'eats2' | 'drive';
    }[];
    nickname: string;
}
