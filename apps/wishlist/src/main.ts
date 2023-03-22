import {NestFactory} from '@nestjs/core';
import {WishlistModule} from './wishlist.module';
import {RmqService} from "@app/common";

async function bootstrap() {
    const app = await NestFactory.create(WishlistModule);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice(rmqService.getOptions('WISHLIST'));
    await app.startAllMicroservices();
}

bootstrap();
