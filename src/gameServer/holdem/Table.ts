import { Dispatcher } from "@colyseus/command";

import TableRoom from '../Table';
import State from './state';
import { Player } from '../state';
import { AddPlayerCommand, LeavePlayerCommand, StartGameLoop, StopGameLoop } from "./commands";

class HoldemTableRoom extends TableRoom<State> {
  maxClients = 2;
  dispatcher = new Dispatcher(this);

  onCreate(options) {
    this.setState(new State());
  }

  onJoin(client, options) {
    const playersCount = this.state.players.length;

    this.dispatcher.dispatch(new AddPlayerCommand(), {
      sessionId: client.sessionId
    });

    if (playersCount === 2) {
      this.dispatcher.dispatch(new StartGameLoop());
    }
  }

  onLeave (client) {
    const playersCount = this.state.players.length;

    this.dispatcher.dispatch(new LeavePlayerCommand(), {
      sessionId: client.sessionId
    });

    if (playersCount < 2) {
      this.dispatcher.dispatch(new StopGameLoop());
    }
  }
}

export default HoldemTableRoom;