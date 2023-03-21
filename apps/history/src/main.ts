import { NestFactory } from '@nestjs/core';
import { HistoryModule } from './history.module';
import {RmqService} from "@app/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(HistoryModule);
  const rmqService=app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('HISTORY'));
  await app.startAllMicroservices();
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
