import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {HistoryService} from './history.service';
import {Ctx, EventPattern, Payload, RmqContext} from "@nestjs/microservices";
import {RmqService} from "@app/common";
import {GetHistory} from "./dto/get-history";
import {DeleteWishlist} from "../../wishlist/src/dto/delete-wishlist";
import {DeleteHistory} from "./schemas/delete-history";

@Controller('/api/history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService, private readonly rmqService: RmqService) {
    }

    @Post('/all')
    async getHistory(@Body() user: GetHistory) {
        return this.historyService.getHistory(user);
    }

    @EventPattern('save_history')
    async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext): Promise<any> {
        console.log("saving history called");
        console.log(data)
        const all_links = await this.historyService.savingHistory(data);
        this.rmqService.ack(context);
        return all_links;
    }

    @Delete('/delete')
    async handleOrderDeleted(@Body() deleteHistory:DeleteHistory): Promise<any> {
        console.log("deleting history called");
        return await this.historyService.deleteHistory(deleteHistory);
    }

    @Delete('/clear')
    async handleHistoryCleared(@Body() deleteHistory:DeleteHistory): Promise<any> {
        console.log("clearing history called");
        return await this.historyService.clearHistory(deleteHistory);
    }

    @Post('/allCount')
    async getHistoryCount(@Body() user: GetHistory) {
        return this.historyService.getHistory(user).then((e)=>{
            return e.length;
        });
    }
}
