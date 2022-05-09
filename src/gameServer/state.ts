import { Schema, type, MapSchema } from "@colyseus/schema";

class Card {
  number: number;
  suit: string;
  played: boolean = false;
}

export class Player extends Schema {
  id: string;
  name: string;
  cards: Card[] = [];
  bankroll: number;
}

class TableState extends Schema {
  currentTurn: string;
  @type("number") bank: number;
  @type("string") bettingRound: string;
  @type("number") deal: number;
  @type("string") dealer: string;
  @type("string") winner: string;

  @type({ map: Player }) players = new MapSchema<Player>();
}

export default TableState;