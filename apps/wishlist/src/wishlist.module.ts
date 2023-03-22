import {Module} from '@nestjs/common';
import {WishlistController} from './wishlist.controller';
import {WishlistService} from './wishlist.service';
import {WishlistRepository} from "./wishlist.repository";
import {HttpModule} from "@nestjs/axios";
import {DatabaseModule, RmqModule} from "@app/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import * as Joi from "joi";
import {Wishlist, WishlistSchema} from "./schemas/wishlist.schema";

@Module({
    imports: [HttpModule, DatabaseModule, MongooseModule.forFeature([{
        name: Wishlist.name, schema: WishlistSchema
    }]), ConfigModule.forRoot({
        isGlobal: true, validationSchema: Joi.object({
            RABBIT_MQ_URI: Joi.string().required(), RABBIT_MQ_WISHLIST_QUEUE: Joi.string().required()
        }), envFilePath: './apps/wishlist/.env'

    }), RmqModule],
    controllers: [WishlistController],
    providers: [WishlistService, WishlistRepository],
})
export class WishlistModule {
}
