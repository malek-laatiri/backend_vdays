import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {HistoryRepository} from "./history.repository";
import {CreateHistoryRequest} from "./dto/create-history.request";
import {History} from "./schemas/history.schema";

@Injectable()
export class HistoryService {
    private readonly logger = new Logger(HistoryService.name);

    constructor(private readonly httpService: HttpService, private readonly historyRepository: HistoryRepository) {
    }

    async savingHistory(request: CreateHistoryRequest) {
        this.logger.log('saving history...');
        try {
            const history = await this.historyRepository.create(request);
            return history;
        } catch (err) {
            throw err;
        }
    }

    async getHistory(user:any) {
        return this.historyRepository.find(user);
    }
}
