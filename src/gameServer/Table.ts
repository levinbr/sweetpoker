import { Room } from "colyseus";
import { Dispatcher } from "@colyseus/command";

import { OnJoinCommand } from './commands';

class TableRoom<State> extends Room {
  maxClients = 10;
  dispatcher = new Dispatcher(this);
/*
  onCreate (options) {
      this.onMessage("message", (client, message) => {
      //console.log("TableRoom received message from", client.sessionId, ":", message);
      this.broadcast("messages", `(${client.sessionId}) ${message}`);
    });
  }

 */
  onJoin(client, options) {
    this.dispatcher.dispatch(new OnJoinCommand(), {
      sessionId: client.sessionId
    });

    this.broadcast("messages", `${ client.sessionId } joined.`);
  }
/*
  onLeave (client) {
    this.broadcast("messages", `${ client.sessionId } left.`);
  }

  onDispose () {
    //console.log("Dispose TableRoom");
  }

 */

}

export default TableRoom;