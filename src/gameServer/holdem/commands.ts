import { Command } from '@colyseus/command';

import { Player } from '../state';
import HoldemTableRoom from './Table';

export class AddPlayerCommand extends Command<HoldemTableRoom, { sessionId: string }> {
  execute({ sessionId }) {
    const player = new Player({id: sessionId, name: 'Vasya', bankroll: 100})
    this.state.players.push(player);
  }
}

export class LeavePlayerCommand extends Command<HoldemTableRoom, { sessionId: string }> {
  execute({ sessionId }) {
    const player = new Player({id: sessionId, name: 'Vasya', bankroll: 100})
    this.state.players = this.state.players.filter(player => player.id !== sessionId)
  }
}

export class StartGameLoop extends Command<HoldemTableRoom, { sessionId: string }> {
  execute({ sessionId }) {

  }
}

export class StopGameLoop extends Command<HoldemTableRoom, { sessionId: string }> {
  execute({ sessionId }) {

  }
}
