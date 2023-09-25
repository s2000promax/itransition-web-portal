import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Public } from '../libs/decorators';
import { ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Public()
@Controller('notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService) {}

    @Get()
    async getContent(@Query('_lang') language: string) {
        try {
            const foundedNotificationList =
                await this.notificationsService.getNotificationList(language);

            return foundedNotificationList;
        } catch (e) {
            throw new BadRequestException('Failed to get notification list');
        }
    }
}
