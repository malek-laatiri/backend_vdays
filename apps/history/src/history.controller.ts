import {Controller} from '@nestjs/common';
import {HistoryService} from './history.service';
import {Ctx, EventPattern, Payload, RmqContext} from "@nestjs/microservices";
import {RmqService} from "@app/common";

@Controller()
export class HistoryController {
    constructor(private readonly historyService: HistoryService, private readonly rmqService: RmqService) {
    }

    @EventPattern('save_history')
    async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext): Promise<any> {
        console.log("saving history called");
        console.log(data)
        const all_links = await this.historyService.savingHistory(data);
        this.rmqService.ack(context);
        return all_links;
    }
}
