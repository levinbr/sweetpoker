import { Room } from "colyseus";

export class TableRoom extends Room {
  maxClients = 3;

  onCreate (options) {
      console.log("TableRoom created!", options);

      this.onMessage("message", (client, message) => {
      console.log("TableRoom received message from", client.sessionId, ":", message);
      this.broadcast("messages", `(${client.sessionId}) ${message}`);
    });
  }

  onJoin (client) {
    this.broadcast("messages", `${ client.sessionId } joined.`);
  }

  onLeave (client) {
    this.broadcast("messages", `${ client.sessionId } left.`);
  }

  onDispose () {
    console.log("Dispose TableRoom");
  }

}
