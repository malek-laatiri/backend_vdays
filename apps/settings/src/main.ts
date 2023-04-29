import { NestFactory } from '@nestjs/core';
import { SettingsModule } from './settings.module';
import {HistoryModule} from "../../history/src/history.module";
import {RmqService} from "@app/common";
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(SettingsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('SETTINGS'));
  await app.startAllMicroservices();
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
      .setTitle(`Settings Microservice is running on: ${configService.get('PORT')}`)
      .setDescription('The Settings microservices description')
      .setVersion('1.0')
      .addTag('Microservices')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT'));
  console.log(`Settings microservice is running on: ${await app.getUrl()}`);
}
bootstrap();
