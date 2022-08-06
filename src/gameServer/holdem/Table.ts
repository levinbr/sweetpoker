import { Dispatcher } from '@colyseus/command';

import TableRoom from '../Table';
import State, { Stages } from './State';
import { AddPlayerCommand, LeavePlayerCommand, DrawCardCommand, ChangeStageCommand } from './commands';
import { getNextPosition } from './utils';

class HoldemTableRoom extends TableRoom<State> {
    maxClients = 2;
    dispatcher = new Dispatcher(this);
    pauseDelay: number = 2082240000; //задержка между отправкой патчей на клиента (мс)

    onCreate(options) {
        this.setState(new State().assign({
            stage: Stages.paused,
        }));

        this.setSimulationInterval(deltaTime => this.gameLoop(deltaTime), 500);
    }

    onJoin(client, options) {
        const playersCount = this.state.players.length;

        this.dispatcher.dispatch(new AddPlayerCommand(), {
            sessionId: client.sessionId,
        });

        if (playersCount === 1) {
            this.state.stage = Stages.ante;
            this.state.gameNumber = 1;
        }
    }

    onLeave(client) {
        const playersCount = this.state.players.length;

        this.dispatcher.dispatch(new LeavePlayerCommand(), {
            sessionId: client.sessionId,
        });

        if (playersCount === 2) {
            this.state.paused = true;
        }
    }

    gameLoop(deltaTime: number) {
        const deltaTimeSeconds = deltaTime / 1000;
        const stage = this.state.stage;

        switch (stage) {
            case Stages.paused:
                break;

            case Stages.ante:
                const players = this.state.players;
                const sBlind = this.state.smallBlindPosition;
                const bBlind = this.state.bigBlindPosition;
                const positions = players.map(player => player.positionNumber).sort();

                this.state.sBlindPosition = sBlind ? getNextPosition(sBlind, positions) : positions[0];
                this.state.bBlindPosition = bBlind ? getNextPosition(bBlind, positions) : positions[sBlind + 1];

                this.state.stage = Stages.paused;
                this.dispatcher.dispatch(new ChangeStageCommand(), { stage: Stages.preflop, delay: 3000 });

                break;

            case Stages.preflop:
                //раздача каджому по 2 карты
                //запуск Stages.betting

                /*
                this.dispatcher.dispatch(new DrawCardCommand(), {
                    sessionId: '1',
                });
                */

                break;

            case Stages.betting:

                break;

            default:
                console.log('Unknown Game Stage');
                break;
        }

    }
}

export default HoldemTableRoom;