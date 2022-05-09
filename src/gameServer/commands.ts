import { Command } from "@colyseus/command";

import State, { Player } from './state';
import TableRoom from './Table';

export class OnJoinCommand extends Command<TableRoom<State>, { sessionId: string }> {

  execute({ sessionId }) {
    this.state.players[sessionId] = new Player();
  }

}