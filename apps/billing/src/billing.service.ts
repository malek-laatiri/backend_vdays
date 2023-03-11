import {Injectable, Logger} from '@nestjs/common';

@Injectable()
export class BillingService {
    private readonly logger = new Logger(BillingService.name);

    getHello(): string {
        return 'Hello World!';
    }

    bill(data: any) {
        this.logger.log('Billing...', data);
        console.log('Billing...' + data);
    }

    async analyse(id: string) {
        let result;
        return fetch("http://127.0.0.1:9000/api/upload",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fileName: id,
                    modelName:"vgg_model"

                })
            })
            .then((res) => {
                //res.json()
                console.log(res)
            })
            .then((res) => {
                result = res;
                console.log(res);
                return result
            });


        return result;
    }
}
