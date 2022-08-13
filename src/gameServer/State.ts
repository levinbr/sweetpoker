import { Schema, type, ArraySchema } from '@colyseus/schema';

export class Card extends Schema {
  name: string;
  suit: string;
  rank: number;
}

export class Seat extends Schema {
  number: number;
  playerId: string;
}

export class Player extends Schema {
  @type('number') positionNumber: number;
  @type('boolean') inGame: boolean;
  @type('boolean') inMaking: boolean;
  @type('boolean') isButton: boolean;

  @type('string') id: string;
  @type('string') name: string;
  @type([Card]) cards = new ArraySchema<Card>();
  @type('number') bankroll: number;
}

class TableState extends Schema {
  @type('string') stage: string;
  @type('number') gameNumber: number;
  @type([Player]) players = new ArraySchema<Player>();
  @type([Card]) communityCard = new ArraySchema<Card>();
  @type('string') currentPlayerId: string;
  @type('number') bank: number;
  @type('string') winnerId: string;
}

export default TableState;
