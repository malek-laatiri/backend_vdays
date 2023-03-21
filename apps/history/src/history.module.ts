import {Module} from '@nestjs/common';
import {HistoryController} from './history.controller';
import {HistoryService} from './history.service';
import {HttpModule} from '@nestjs/axios'
import {ConfigModule} from "@nestjs/config";
import * as Joi from "joi";
import {DatabaseModule, RmqModule} from "@app/common";
import {HistoryRepository} from "./history.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {History, HistorySchema} from "./schemas/history.schema";

@Module({
    imports: [HttpModule, DatabaseModule, MongooseModule.forFeature([{
        name: History.name, schema: HistorySchema
    }]), ConfigModule.forRoot({
        isGlobal: true, validationSchema: Joi.object({
            RABBIT_MQ_URI: Joi.string().required(), RABBIT_MQ_HISTORY_QUEUE: Joi.string().required()
        }),                envFilePath: './apps/history/.env'

    }), RmqModule], controllers: [HistoryController], providers: [HistoryService, HistoryRepository],
})
export class HistoryModule {
}
