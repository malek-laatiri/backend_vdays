import {Controller, Get} from '@nestjs/common';
import {WishlistService} from './wishlist.service';
import {RmqService} from "@app/common";
import {Ctx, EventPattern, Payload, RmqContext} from "@nestjs/microservices";

@Controller()
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService, private readonly rmqService: RmqService) {
    }

    @Get('/all')
    async getWishlist() {
        return this.wishlistService.getWishlist();
    }

    @EventPattern('save_wishlist')
    async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext): Promise<any> {
        console.log("saving wishlist called");
        const all_links = await this.wishlistService.savingWishlist(data);
        this.rmqService.ack(context);
        return all_links;
    }


}
