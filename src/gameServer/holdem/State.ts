import { ArraySchema, type } from '@colyseus/schema';

import TableState, { Card, Player, Seat } from '../State';

export const initialState = {
  paused: true,
  gameNumber: 1,
  bank: 0,
}

export enum Stages {
  paused = 'paused', //игровая пауза
  ante = 'ante', //начальная ставка блаиндов
  betting = 'betting', //раунд торгов (call, raise, fold)
  preflop = "pre-flop", //первая раздача карт
  flop = "flop", //вторарая раздача
  turn = "turn", //третья раздача
  river = "river", //четвертая раздача
  showdown = "showdown" //вскрытие карт
}

export class HoldemTableState extends TableState {
  @type([Seat]) seats = new ArraySchema<Seat>(); //??
  @type("number") bBlindPosition: number;
  @type("number") sBlindPosition: number;
  @type([Card]) cardsInDeck = new ArraySchema<Card>();
  @type([Card]) cardsInTable = new ArraySchema<Card>();
}

export default HoldemTableState;