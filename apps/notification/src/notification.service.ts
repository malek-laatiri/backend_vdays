import {Inject, Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {NotificationRepository} from "./notification.repository";
import {WISHLIST_SERVICE} from "../../orders/src/constant/services";
import {ClientProxy} from "@nestjs/microservices";
import {GetNotificationRequest} from "./dto/getNotification.request";

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);


    constructor(private readonly httpService: HttpService, private readonly notificationRepository: NotificationRepository, @Inject(WISHLIST_SERVICE) private wishlistClient: ClientProxy) {
    }

    async savingNotification(request: GetNotificationRequest) {
        this.logger.log('saving notifcation...');
        var item;
        var predict_class = this.wishlistClient.send('get_wishlist', {
            "user": request.user
        }).toPromise().then(async (e) => {
            item = e[Math.floor(Math.random() * e.length)];
            try {
                console.log(item)
                var CreateNotificationRequest = {
                    "title": item.title, "url": item.url, "user": item.user
                };


                const wishlist = await this.notificationRepository.create(CreateNotificationRequest);
                return wishlist;
            } catch (err) {
                throw err;
            }
        });

        return predict_class;

    }

    async getNotification(data: any) {
        return this.notificationRepository.find(data);
    }

}
