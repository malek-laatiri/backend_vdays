import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderRequest} from "./dto/create-order.request";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateQrRequest} from "./dto/create-qr.request";
import {CreateHistoryRequest} from "../../history/src/dto/create-history.request";

@Controller('/api/classification')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Get()
    async getOrders() {
        return this.ordersService.getOrders();
    }
    @Get('/connection')
    async testConnection() {
        return "connected";
    }
    @Post()
    async createOrder(@Body() request: CreateOrderRequest) {
        return this.ordersService.createOrder(request);
    }

    @Post('/upload') @UseInterceptors(FileInterceptor('image')) create(@UploadedFile() file: Express.Multer.File) {
        const fileB64 = file.buffer.toString('base64');
        this.ordersService.saveFile({"name": fileB64});

        return this.ordersService.analyse(fileB64);


    }

    @Post('/qr')
    async qr(@Body() request: CreateQrRequest) {
        var links = await this.ordersService.analyseQr(request);
        var historyData = {
            "title": request.query,

            "date": new Date().toISOString(),

            "isQr": true
        };
        var history = await this.ordersService.saveHistory(historyData);
        return links;


    }

}
