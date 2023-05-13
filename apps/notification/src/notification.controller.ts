import {Body, Controller, Post} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {GetNotificationRequest} from "./dto/getNotification.request";

@Controller("/api/notifications")
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {
    }

    @Post('/new')
    async handleNotificationCreated(@Body() request: GetNotificationRequest): Promise<any> {
        console.log("saving notification called");
        const notification = await this.notificationService.savingNotification(request);
        return notification;
    }

    @Post('/all')
    async getWishlist(@Body() getNotificationslist: GetNotificationRequest) {
        console.log("fetching notifications called");
        return this.notificationService.getNotification(getNotificationslist);
    }
}
