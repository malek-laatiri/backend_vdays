import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderRequest} from "./dto/create-order.request";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
@Controller('api/orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Get()
    async getOrders() {
        return this.ordersService.getOrders();
    }

    @Post()
    async createOrder(@Body() request: CreateOrderRequest) {
        return this.ordersService.createOrder(request);
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('image'))
    create(@UploadedFile() file: Express.Multer.File) {
        const fileB64 = file.buffer.toString('base64');
        this.ordersService.saveFile({"name": fileB64});

        return this.ordersService.analyse(fileB64);


    }
}
