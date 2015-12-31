import {Component,Input} from 'angular2/core';
import {canPlay, hasWon} from '../../services/helpers';
import * as actions from '../../services/actions';
import {store} from '../../services/store';

import {GameType} from './type';

@Component({
    selector: 'game',
    templateUrl: './components/game/game.html',
    styles: [`
        .played-circle {
            background: #E91E63;
        }
        .played-cross {
            background: #9C27B0;
        }
        .me {
            background: #8BC34A;
        }
        .activeable {
            border-color: #8BC34A;
            background: #CCFFCC;
            cursor: pointer;
        }
    `]

})
export class GameCmp {
    @Input() game:GameType;
    @Input() socket:any;
    username:string;
    position:number;

    constructor() {
        this.username = 'moi';
    }

    canIPlay(row, column) {
        this.position = this.game.players.indexOf(this.username)
        return !!canPlay({playerId: this.username, row, column}, this.game);
    }
    
    play(row, column) {
        this.socket.emit('play', {row, column, gameId: this.game.id})
        //return store.dispatch(actions.play({id:this.game.id,row,column,playerId:this.username}))
    }
}
