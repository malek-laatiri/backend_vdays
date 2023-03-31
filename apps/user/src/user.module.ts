import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserRepository} from "./User.repository";
import {HttpModule} from "@nestjs/axios";
import {DatabaseModule, RmqModule} from "@app/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import * as Joi from "joi";
import {User, UserSchema} from "../schemas/User.schema";

@Module({
    imports: [HttpModule, DatabaseModule, MongooseModule.forFeature([{
        name: User.name, schema: UserSchema
    }]), ConfigModule.forRoot({
        isGlobal: true, validationSchema: Joi.object({
            RABBIT_MQ_URI: Joi.string().required(), RABBIT_MQ_USER_QUEUE: Joi.string().required()
        }), envFilePath: './apps/user/.env'

    }), RmqModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {
}
