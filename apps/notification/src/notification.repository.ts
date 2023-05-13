import {Injectable, Logger} from "@nestjs/common";
import {AbstractRepository} from "@app/common";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from "mongoose";
import {Notification} from "./schemas/notification.schema";

@Injectable()
export class NotificationRepository extends AbstractRepository<Notification> {
    protected readonly logger = new Logger(NotificationRepository.name);

    constructor(@InjectModel(Notification.name) notificationModel: Model<Notification>, @InjectConnection() connection: Connection) {
        super(notificationModel, connection);
    }

}