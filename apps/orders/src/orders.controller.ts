import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderRequest} from "./dto/create-order.request";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateQrRequest} from "./dto/create-qr.request";

@Controller('/api/classification')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }


    @Get('/connection')
    async testConnection() {
        return "connected";
    }


    @Post('/upload')
    @UseInterceptors(FileInterceptor('image'))
    create(@UploadedFile() file: Express.Multer.File, @Body() request: CreateOrderRequest) {

        const fileB64 = file.buffer.toString('base64');
        request.imageFile = fileB64;
        this.ordersService.saveFile(request);

        //return this.ordersService.analyse(fileB64);


    }

    @Post('/qr')
    async qr(@Body() request: CreateQrRequest) {
        var links = await this.ordersService.analyseQr(request);
        var historyData = {
            "title": request.query,

            "user": request.user,

            "isQr": true
        };
        var history = await this.ordersService.saveHistory(historyData);
        return links;
    }


    @Post('/analyze/url')
    async url(@Body() request: { "url": string }) {
        var links = await this.ordersService.analyseUrl(request);

        return links;
    }


}
