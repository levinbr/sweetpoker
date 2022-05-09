import { NestFactory } from '@nestjs/core';
import { monitor } from "@colyseus/monitor";
import { Server } from "colyseus";

import { AppModule } from './app.module';
import HoldemTableRoom from "./gameServer/Holdem/Table"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const gameServer = new Server();

  gameServer.define("holdemTable", HoldemTableRoom);
  gameServer.attach({ server: app.getHttpServer() });

  app.use("/colyseus", monitor());
  
  await app.listen(3000);
}
bootstrap();
