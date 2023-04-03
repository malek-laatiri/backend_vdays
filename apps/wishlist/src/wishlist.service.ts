import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {WishlistRepository} from "./wishlist.repository";
import {CreateWishlistRequest} from "./dto/create-wishlist.request";

@Injectable()
export class WishlistService {
    private readonly logger = new Logger(WishlistService.name);

    constructor(private readonly httpService: HttpService, private readonly wishlistRepository: WishlistRepository) {
    }

    async savingWishlist(request: CreateWishlistRequest) {
        this.logger.log('saving history...');
        try {
            const wishlist = await this.wishlistRepository.create(request);
            return wishlist;
        } catch (err) {
            throw err;
        }
    }

    async getWishlist(data: any) {
        return this.wishlistRepository.find(data);
    }
    async deleteWishlist(data: any) {
        return this.wishlistRepository.delete(data);
    }

    async clearWishlist(data: any) {
        return this.wishlistRepository.delete({user:data._id});
    }
}
