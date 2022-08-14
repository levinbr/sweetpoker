import { Command } from '@colyseus/command';

import { Player, Card } from '../State';
import HoldemTableRoom from './Table';

export class AddPlayerCommand extends Command<HoldemTableRoom, { sessionId: string }> {
    execute({ sessionId }) {
        const player = new Player({ id: sessionId, name: 'Vasya', bankroll: 100 });
        const indexSeat = this.state.seats.findIndex(seat => !seat.playerId)

        this.state.players.push(player);
        this.state.seats[indexSeat].playerId = sessionId;
    }
}

export class LeavePlayerCommand extends Command<HoldemTableRoom, { sessionId: string }> {
    execute({ sessionId }) {
        const player = new Player({ id: sessionId, name: 'Vasya', bankroll: 100 });

        this.state.players = this.state.players.filter(player => player.id !== sessionId);
        this.state.seats.forEach((seat, index) => {
            if (seat.playerId === sessionId) this.state.seats[index].playerId = '';
        });
    }
}

export class DrawCardToPlayersCommand extends Command<HoldemTableRoom> {
    execute() {
        const { deck, players } = this.state;
        const randomCardIndex = Math.floor(Math.random() * deck.length);
        const randomCard = deck[randomCardIndex];

        players.forEach(player => {
            player.cards.push(new Card(randomCard));
        });

        deck.splice(randomCardIndex, 1);
    }
}

export class ChangeStageCommand extends Command<HoldemTableRoom, { stage: string, delay?: number }> {
    execute({ stage, delay = 0 }) {
        this.clock.setTimeout(() => this.state.stage = stage, delay);
    }
}