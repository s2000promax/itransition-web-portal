import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getServerMessage(): string {
        return 'Itransition web-portal SERVER';
    }
}
