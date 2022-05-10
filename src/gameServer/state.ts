import { Schema, type, ArraySchema } from '@colyseus/schema';

class Card {
  number: number;
  suit: string;
  played: boolean = false;
}

export class Player extends Schema {
  @type('string') id: string;
  @type('string') name: string;
  //@type([]) cards: Card[] = [];
  @type('number') bankroll: number;
}

class TableState extends Schema {
  @type('string') currentTurn: string;
  @type('number') bank: number;
  @type('string') bettingRound: string;
  @type('number') deal: number;
  @type('string') dealer: string;
  @type('string') winner: string;
  @type([Player]) players = new ArraySchema<Player>();
}

export default TableState;
