import {NestFactory} from '@nestjs/core';
import {UserModule} from './user.module';
import {RmqService} from "@app/common";
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import  '@nestjs/swagger';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(UserModule);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice(rmqService.getOptions('USER'));
    app.useGlobalPipes(new ValidationPipe());
    await app.startAllMicroservices();
    const configService = app.get(ConfigService);
    const config = new DocumentBuilder()
        .setTitle(`Users Microservice is running on: ${configService.get('PORT')}`)
        .setDescription('The Users microservices description')
        .setVersion('1.0')
        .addTag('Microservices')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(configService.get('PORT'));
    console.log(`Users microservice is running on: ${await app.getUrl()}`);

}

bootstrap();
