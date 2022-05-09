import TableRoom from '../Table';
import State from './state';

class HoldemTableRoom extends TableRoom<State> {
  maxClients = 2;

  onCreate(options) {
    this.setState(new State());
  }
}

export default HoldemTableRoom;