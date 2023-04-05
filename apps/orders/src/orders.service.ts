import {Inject, Injectable} from '@nestjs/common';
import {CreateOrderRequest} from "./dto/create-order.request";
import {OrdersRepository} from "./orders.repository";
import {BILLING_SERVICE, HISTORY_SERVICE} from "./constant/services";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {HttpService} from '@nestjs/axios'

@Injectable()
export class OrdersService {

    constructor(private readonly orderRepository: OrdersRepository, @Inject(BILLING_SERVICE) private billingClient: ClientProxy, @Inject(HISTORY_SERVICE) private historyClient: ClientProxy, private readonly httpService: HttpService) {

    }


    async createOrder(request: CreateOrderRequest) {
        try {
            const order = await this.orderRepository.create(request);
            await lastValueFrom(this.billingClient.emit('order_created', {request,}));
            return order;
        } catch (err) {
            throw err;
        }


    }

    async saveFile(request) {
        try {
            const order = await this.orderRepository.create(request);
            return order;
        } catch (err) {
            throw err;
        }
    }

    async analyse(id: string) {
        console.log("the base64 received");
        var predict_class = this.billingClient.send('predict_class', {
            "file64": id, "modelName": "resnet_model"
        }).toPromise();
        console.log(predict_class);
        return predict_class;
        // var links = this.billingClient.send('search_class', {
        //     "country": "us", "query": "iphone", "language": "en"
        // }).toPromise();
        // return links;
    }

    async analyseQr(data: any) {

        // return response.data;
        var links = this.billingClient.send('search_class', data).toPromise();
        return links;
    }

    async saveHistory(data: any) {
        var links = this.historyClient.send('save_history', data).toPromise();

        return links;
    }


    async analyseUrl(data: any) {

        // return response.data;
        var links = this.billingClient.send('search_url', data).toPromise();
        return links;
    }


}

