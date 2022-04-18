import { NestFactory } from '@nestjs/core';
import { Server } from "colyseus";
import { AppModule } from './app.module';

import { TableRoom } from "./gameServer/rooms/Table"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const gameServer = new Server();

  gameServer.define("table", TableRoom);
  gameServer.attach({ server: app.getHttpServer() });

  await app.listen(3000);
}
bootstrap();
