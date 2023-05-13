import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import {HistoryModule} from "../../history/src/history.module";
import {RmqService} from "@app/common";
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('NOTIFICATION'));
  await app.startAllMicroservices();
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
      .setTitle(`Notification Microservice is running on: ${configService.get('PORT')}`)
      .setDescription('The Notification microservices description')
      .setVersion('1.0')
      .addTag('Microservices')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT'));
  console.log(`Notification microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
