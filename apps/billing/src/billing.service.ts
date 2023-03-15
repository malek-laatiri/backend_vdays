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
        this.logger.log('scrapping...');
        console.log('scrapping...');
        // const response = await this.httpService.post("http://host.docker.internal:9000/api/all_products", data).toPromise();
       const response = await this.httpService.post("http://172.17.0.1:9000/api/all_products", data).toPromise();

       console.log(response);
        return response;
    }


}
