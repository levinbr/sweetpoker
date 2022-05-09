import { type } from "@colyseus/schema";

import TableState from '../state';

export class HoldemTableState extends TableState {
  @type("number") bigBlind: number;
  @type("number") smallBlind: number;
}

export default HoldemTableState;