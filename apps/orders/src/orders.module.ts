import {Module} from '@nestjs/common';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';
import {ConfigModule} from '@nestjs/config';
import * as Joi from 'joi';
import {DatabaseModule, RmqModule} from "@app/common";
import {OrdersRepository} from "./orders.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Order, OrderSchema} from "./schemas/order.schema";
import {
    BILLING_SERVICE,
    HISTORY_SERVICE,
    NOTIFICATION_SERVICE,
    SETTINGS_SERVICE,
    USER_SERVICE,
    WISHLIST_SERVICE
} from "./constant/services";
import {HttpModule} from '@nestjs/axios'


@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot(
            {
                isGlobal: true,
                validationSchema: Joi.object({
                    MONGODB_URI: Joi.string().required(),
                    PORT: Joi.number().required()

                }),
                envFilePath: './apps/orders/.env'
            }
        ),
        DatabaseModule,
        MongooseModule.forFeature(
            [{
                name: Order.name, schema: OrderSchema
            }]
        ),
        RmqModule,
        RmqModule.register({
            name: BILLING_SERVICE,
        }),
        RmqModule.register({
            name: HISTORY_SERVICE,
        }),
        RmqModule.register({
            name: WISHLIST_SERVICE,
        }),
        RmqModule.register({
            name: USER_SERVICE,
        }),
        RmqModule.register({
            name: NOTIFICATION_SERVICE,
        })
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {
}
