import {NestFactory} from '@nestjs/core';
import {OrdersModule} from './orders.module';
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(OrdersModule);
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    const config = new DocumentBuilder()
        .setTitle(`Classification Microservice is running on: ${configService.get('PORT')}`)
        .setDescription('The Classification microservices description')
        .setVersion('1.0')
        .addTag('Microservices')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(configService.get('PORT'));
    console.log(`Classification microservice is running on: ${await app.getUrl()}`);

}

bootstrap();
