import { Room } from 'colyseus';
import { Dispatcher } from '@colyseus/command';

import { OnJoinCommand } from './commands';
import { Player } from './state';

class TableRoom<State> extends Room {
  maxClients = 10;
  dispatcher = new Dispatcher(this);

  onCreate(options) {
    this.onMessage('message', (client, message) => {
      //console.log("TableRoom received message from", client.sessionId, ":", message);
      //this.broadcast('messages', `(${client.sessionId}) ${message}`);
    });
  }

  onJoin(client, options) {
    /*
    this.dispatcher.dispatch(new OnJoinCommand(), {
      sessionId: client.sessionId
    });
     */

    this.broadcast('messages', `${client.sessionId} joined.`);

    this.state.players.push(
      new Player().assign({
        id: '33',
        name: '33',
        //cards: [],
        bankroll: 1000,
      }),
    );
    this.state.bigBlind = 100;
  }
  /*
  onLeave (client) {
    this.broadcast("messages", `${ client.sessionId } left.`);
  }

 */
  onDispose() {
    this.dispatcher.stop();
  }
}

export default TableRoom;
