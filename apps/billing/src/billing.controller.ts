import {Controller, Get} from '@nestjs/common';
import {BillingService} from './billing.service';
import {Ctx, EventPattern, Payload, RmqContext} from "@nestjs/microservices";
import {RmqService} from "@app/common";

@Controller()
export class BillingController {
    constructor(private readonly billingService: BillingService,
                private readonly rmqService:RmqService) {
    }

    @Get()
    getHello(): string {
        return this.billingService.getHello();
    }

    @EventPattern('search_class')
    async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext):Promise<[]> {
        console.log("search_class called");
        const all_links= await this.billingService.bill(data);
        this.rmqService.ack(context);
        return all_links;
    }
}
