import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import {SettingsService} from './settings.service';
import {RmqService} from "@app/common";
import {SettingsRequest} from "./dto/settings.request";

@Controller("/api/settings")
export class SettingsController {
    constructor(private readonly settingsService: SettingsService, private readonly rmqService: RmqService) {
    }

    @Post("/new")
    New(@Body() request:SettingsRequest) {
        return this.settingsService.save(request);
    }

    @Put("/update")
    Update(@Body() request:SettingsRequest) {
        return this.settingsService.update(request);
    }

    @Post("/get")
    Get(@Body() request:SettingsRequest) {
        return this.settingsService.get(request);
    }
}
