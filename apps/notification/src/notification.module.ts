import {Module} from '@nestjs/common';
import {NotificationController} from './notification.controller';
import {NotificationService} from './notification.service';
import {ScheduleModule} from "@nestjs/schedule";
import {HttpModule} from "@nestjs/axios";
import {DatabaseModule, RmqModule} from "@app/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import * as Joi from "joi";
import {Notification, NotificationSchema} from "./schemas/notification.schema";
import {NotificationRepository} from "./notification.repository";
import {WISHLIST_SERVICE} from "../../orders/src/constant/services";

@Module({
    imports: [ScheduleModule.forRoot(), HttpModule, DatabaseModule, MongooseModule.forFeature([{
        name: Notification.name, schema: NotificationSchema
    }]), ConfigModule.forRoot({
        isGlobal: true, validationSchema: Joi.object({
            RABBIT_MQ_URI: Joi.string().required(), RABBIT_MQ_NOTIFICATION_QUEUE: Joi.string().required()
        }), envFilePath: './apps/notification/.env'

    }), RmqModule,RmqModule.register({
        name: WISHLIST_SERVICE,
    })],
    controllers: [NotificationController],
    providers: [NotificationService, NotificationRepository],
})
export class NotificationModule {
}
