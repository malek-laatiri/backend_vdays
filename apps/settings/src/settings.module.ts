import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import {HttpModule} from "@nestjs/axios";
import {DatabaseModule, RmqModule} from "@app/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import * as Joi from "joi";
import {Settings_user, Settings_userSchema} from "./schemas/Settings_user.schema";
import {SettingsRepository} from "./settings.repository";

@Module({
  imports: [HttpModule, DatabaseModule, MongooseModule.forFeature([{
    name: Settings_user.name, schema: Settings_userSchema
  }]), ConfigModule.forRoot({
    isGlobal: true, validationSchema: Joi.object({
      RABBIT_MQ_URI: Joi.string().required(), RABBIT_MQ_SETTINGS_QUEUE: Joi.string().required()
    }),                envFilePath: './apps/settings/.env'

  }), RmqModule],
  controllers: [SettingsController],
  providers: [SettingsService,SettingsRepository],
})
export class SettingsModule {}
