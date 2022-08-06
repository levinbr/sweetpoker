import { Command } from '@colyseus/command';

import State, { Player } from './State';
import TableRoom from './Table';

export class OnJoinCommand extends Command<
  TableRoom<State>,
  { sessionId: string }
> {
  execute({ sessionId }) {
    const player = new Player();
    player.name = 'Vasya';
    //this.state.players.set(sessionId, player);
  }
}
