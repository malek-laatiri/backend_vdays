import {Injectable, Logger} from "@nestjs/common";
import {AbstractRepository} from "@app/common";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from "mongoose";
import {User} from "../schemas/User.schema";

@Injectable()
export class UserRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UserRepository.name);

    constructor(@InjectModel(User.name) wishlistModel: Model<User
    >, @InjectConnection() connection: Connection) {
        super(wishlistModel, connection);
    }

}