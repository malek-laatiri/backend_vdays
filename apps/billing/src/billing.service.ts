import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from '@nestjs/axios'

@Injectable()
export class BillingService {
    private readonly logger = new Logger(BillingService.name);

    constructor(private readonly httpService: HttpService) {
    }

    async bill(data: any):Promise<[]> {
        this.logger.log('scrapping...');
        var links=await this.httpService.post("http://172.17.0.1:9000/api/all_products", data).toPromise();
        return links.data;
    }

    async byUrl(data: any):Promise<[]> {
        this.logger.log('scrapping...');
        var links=await this.httpService.post("http://172.17.0.1:9000/api/byurl", data).toPromise();
        return links.data;
    }
}
