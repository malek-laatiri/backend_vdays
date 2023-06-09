import {NestFactory} from '@nestjs/core';
import {WishlistModule} from './wishlist.module';
import {RmqService} from "@app/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(WishlistModule);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice(rmqService.getOptions('WISHLIST'));
    await app.startAllMicroservices();
    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle(`Wishlist Microservice is running on: ${configService.get('PORT')}`)
        .setDescription('The Wishlist microservices description')
        .setVersion('1.0')
        .addTag('Microservices')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(configService.get('PORT'));
    console.log(`Wishlist microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
