import {Injectable, Logger} from "@nestjs/common";
import {AbstractRepository} from "@app/common";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from "mongoose";
import {Wishlist} from "./schemas/wishlist.schema";

@Injectable()
export class WishlistRepository extends AbstractRepository<Wishlist> {
    protected readonly logger = new Logger(WishlistRepository.name);

    constructor(@InjectModel(Wishlist.name) wishlistModel: Model<Wishlist>, @InjectConnection() connection: Connection) {
        super(wishlistModel, connection);
    }

}