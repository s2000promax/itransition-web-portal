import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
    constructor(private readonly prismaService: PrismaService) {}

    async getNotificationList(language: string) {
        try {
            const foundedNotificationList =
                await this.prismaService.notification.findMany({
                    where: {
                        language,
                    },
                });

            return foundedNotificationList;
        } catch (e) {
            console.log(e);
        }
    }
}
