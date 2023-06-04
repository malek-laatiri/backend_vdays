import {Controller, Get} from '@nestjs/common';
import {BillingService} from './billing.service';
import {Ctx, EventPattern, Payload, RmqContext} from "@nestjs/microservices";
import {RmqService} from "@app/common";

@Controller()
export class BillingController {
    constructor(private readonly billingService: BillingService,
                private readonly rmqService:RmqService) {
    }



    @EventPattern('predict_class')
    async handlePredictClass(@Payload() data: any, @Ctx() context: RmqContext):Promise<[]> {
        console.log("predict_class called");
        const all_links= await this.billingService.prdictClass(data);
        console.log(all_links.toString());
        this.rmqService.ack(context);
        return all_links;
    }

    @EventPattern('search_class')
    async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext):Promise<[]> {
        console.log("search_class called");
        const all_links= await this.billingService.bill(data);
        this.rmqService.ack(context);
        return all_links;
    }

    @EventPattern('search_url')
    async handleOrderCreatedUrl(@Payload() data: any, @Ctx() context: RmqContext):Promise<[]> {
        console.log("search_url called");
        const all_links= await this.billingService.byUrl(data);
        this.rmqService.ack(context);
        return all_links;
    }

    @EventPattern('compare')
    async compare(@Payload() data: any, @Ctx() context: RmqContext):Promise<[]> {
        console.log("compare called");
        const all_links= await this.billingService.compare(data);
        this.rmqService.ack(context);
        return all_links;
    }

    @EventPattern('rating')
    async rating(@Payload() data: any, @Ctx() context: RmqContext):Promise<[]> {
        console.log("rating called");
        const all_links= await this.billingService.rating(data);
        this.rmqService.ack(context);
        return all_links;
    }
}
