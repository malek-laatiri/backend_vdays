import {Inject, Injectable} from '@nestjs/common';
import {CreateOrderRequest} from "./dto/create-order.request";
import {OrdersRepository} from "./orders.repository";
import {BILLING_SERVICE} from "./constant/services";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {HttpService} from '@nestjs/axios'
import {AxiosError} from "axios";
import {catchError} from "rxjs/operators";

@Injectable()
export class OrdersService {

    constructor(private readonly orderRepository: OrdersRepository,
                @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
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
        let result;
       const response=await this.httpService.get("http://host.docker.internal:9000/api/hello/world").toPromise();
        console.log(response.data);


        return result;
    }
}
