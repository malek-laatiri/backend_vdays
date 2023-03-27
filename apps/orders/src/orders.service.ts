import {Inject, Injectable} from '@nestjs/common';
import {CreateOrderRequest} from "./dto/create-order.request";
import {OrdersRepository} from "./orders.repository";
import {BILLING_SERVICE, HISTORY_SERVICE, WISHLIST_SERVICE} from "./constant/services";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {HttpService} from '@nestjs/axios'

@Injectable()
export class OrdersService {

    constructor(private readonly orderRepository: OrdersRepository,
                @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
                @Inject(HISTORY_SERVICE) private historyClient: ClientProxy,
                @Inject(WISHLIST_SERVICE) private wishlistClient: ClientProxy,
                private readonly httpService: HttpService) {

    }

    async getOrders() {
        return this.orderRepository.find({});
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
        // const response = await this.httpService.post("http://host.docker.internal:9000/api/uploadX", {
        //     "fileName": id,
        //     "modelName": "vgg_model"
        // }).toPromise();
        // console.log(response.data);
        const all_links = await lastValueFrom(this.billingClient.emit('search_class', {
            "country": "us",
            "query": "iphone",
            "language": "en"
        }));

        // return response.data;
        return all_links;
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

    async saveWishlist(data: any) {
        var links = this.wishlistClient.send('save_wishlist', data).toPromise();

        return links;
    }

    async analyseUrl(data: any) {

        // return response.data;
        var links = this.billingClient.send('search_url', data).toPromise();
        return links;
    }
}
