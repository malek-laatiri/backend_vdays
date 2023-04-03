import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {WishlistService} from './wishlist.service';
import {RmqService} from "@app/common";
import {Ctx, EventPattern, Payload, RmqContext} from "@nestjs/microservices";
import {CreateUserRequest} from "../../user/dto/create-user.request";
import {CreateWishlistRequest} from "./dto/create-wishlist.request";
import {GetWishlist} from "./dto/get-wishlist";
import {DeleteWishlist} from "./dto/delete-wishlist";

@Controller('api/wishlist')
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService, private readonly rmqService: RmqService) {
    }

    @Post('/all')
    async getWishlist(@Body() getWishlist:GetWishlist) {
        console.log("fetching wishlist called");
        return this.wishlistService.getWishlist(getWishlist);
    }

    @Post('/new')
    async handleOrderCreated(@Body() request: CreateWishlistRequest): Promise<any> {
        console.log("saving wishlist called");
        const wishlist = await this.wishlistService.savingWishlist(request);
        return wishlist;
    }

    @Delete('/delete')
    async handleOrderDeleted(@Body() deleteWishlist:DeleteWishlist): Promise<any> {
        console.log("deleting wishlist called");
        return await this.wishlistService.deleteWishlist(deleteWishlist);
    }
    @Delete('/clear')
    async handleWishlistClear(@Body() deleteWishlist:DeleteWishlist): Promise<any> {
        console.log("deleting wishlist called");
        return await this.wishlistService.clearWishlist(deleteWishlist);
    }

}
