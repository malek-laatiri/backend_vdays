import {Injectable, Logger} from "@nestjs/common";
import {AbstractRepository} from "@app/common";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Connection, Model} from "mongoose";
import {History} from "./schemas/history.schema";

@Injectable()
export class HistoryRepository extends AbstractRepository<History> {
    protected readonly logger = new Logger(HistoryRepository.name);

    constructor(@InjectModel(History.name) historyModel: Model<History>, @InjectConnection() connection: Connection) {
        super(historyModel, connection);
    }

}