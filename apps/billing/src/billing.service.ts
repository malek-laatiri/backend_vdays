import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from '@nestjs/axios'

@Injectable()
export class BillingService {
    private readonly logger = new Logger(BillingService.name);

    constructor(
                private readonly httpService: HttpService) {

    }

    getHello(): string {
        return 'Hello World!';
    }

   async bill(data: any) {
        this.logger.log('Billing...', data);
        console.log('Billing...' + data);
        const response = await this.httpService.post("http://host.docker.internal:9000/api/all_products", data).toPromise();
        console.log(response.data);
    }


}
