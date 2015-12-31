/// <reference path="../../../typings/tsd/lodash/lodash.d.ts" />

import {Component} from 'angular2/core';
import {store} from '../../services/store';
import * as actions from '../../services/actions';
import {createSocket} from '../../services/sockets';
import {GameCmp} from '../game/game';

import {values,map} from 'lodash';

@Component({
    selector: 'games',
    templateUrl: './components/games/games.html',
    directives: [GameCmp]
})

export class GamesCmp {
    games:Array<Object>;
    socket:any;
    constructor() {
        this.socket = createSocket({query: 'token=eyJhbGciOiJIUzI1NiJ9.bW9p.OwZ3CCU0NjNHBhKWWp7-z8vb4oQ-oedempHvsfhh5sI'})
        this.socket.emit('getGames', (games) => {
            map(games.games, (game) => store.dispatch(actions.setGame({game})))
        })
        this.socket.on('dispatch', (action) => {
            store.dispatch(action)
        })
        store.subscribe(() => {
            this.games = values(store.getState().board.games)
        })
    }
}
