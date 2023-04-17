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
    async create(@UploadedFile() file: Express.Multer.File, @Body() request: CreateOrderRequest) {

        const fileB64 = file.buffer.toString('base64');
        request.imageFile = fileB64;
        this.ordersService.saveFile(request);
        var predicted_class = this.ordersService.analyse(fileB64);
        var mySubString;
        predicted_class.then(async (e) => {
            mySubString = e.substring(
                e.indexOf("{") ,
                e.lastIndexOf("}")+1
            );
            console.log(mySubString)
            var historyData = {
                "title": JSON.parse(mySubString).label,
                "user": request.user,
                "isQr": false
            };
            var history = await this.ordersService.saveHistory(historyData);
        })
        // var historyData = {
        //     "title": "predicted_class",
        //     "user": request.user,
        //     "isQr": false
        // };
        // var history = await this.ordersService.saveHistory(historyData);
        return predicted_class;

    }

    @Post('/qr')
    async qr(@Body() request: CreateQrRequest) {
        var links = await this.ordersService.analyseQr(request);
        console.log(request.country);
        console.log(request.language);
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
