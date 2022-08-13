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

export class DrawCardCommand extends Command<HoldemTableRoom, { sessionId: string }> {
    execute({ sessionId }) {
        const { cardDeck, players } = this.state;
        const randomCardIndex = Math.floor(Math.random() * cardDeck.length);
        const randomCard = cardDeck[randomCardIndex];

        players.forEach(player => {
            player.cards.push(new Card(randomCard));
        });

        cardDeck.splice(randomCardIndex, 1);
    }
}

export class ChangeStageCommand extends Command<HoldemTableRoom, { stage: string, delay: number }> {
    execute({ stage, delay }) {
        this.clock.setTimeout(() => this.state.stage = stage, delay);
    }
}