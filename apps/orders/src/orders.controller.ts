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
        var predicted_class = this.ordersService.analyse(fileB64,request.left,request.top,request.bottom,request.right);
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
            return JSON.parse(mySubString).label;
        })

        return predicted_class.then((e)=>{
            var s=e.substring(
                e.indexOf("{") ,
                e.lastIndexOf("}")+1
            );
            return JSON.parse(s).label
        });

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

    @Post('/compare')
    async compare(@Body() request: { "url": string}) {
        var links = await this.ordersService.compare(request);

        return links;
    }


    @Post('/rating')
    async rating(@Body() request: { "url": string}) {
        var links = await this.ordersService.rating(request);
        return links;
    }
}
