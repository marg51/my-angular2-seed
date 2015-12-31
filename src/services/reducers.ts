/// <reference path="../../typings/tsd/lodash/lodash.d.ts" />
import {merge} from 'lodash';


export const INIT_STATE = {
    games: {
      'ca2cf359-8c7d-4cd3-859d-97b72c948914': {
        'matrix': {
          '0': {
            '0': null,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': null,
            '6': null
          },
          '1': {
            '0': null,
            '1': null,
            '2': null,
            '3': 1,
            '4': null,
            '5': null,
            '6': null
          },
          '2': {
            '0': null,
            '1': null,
            '2': null,
            '3': 1,
            '4': null,
            '5': null,
            '6': null
          },
          '3': {
            '0': null,
            '1': null,
            '2': null,
            '3': 1,
            '4': null,
            '5': null,
            '6': null
          },
          '4': {
            '0': null,
            '1': null,
            '2': null,
            '3': null,
            '4': null,
            '5': null,
            '6': null
          },
          '5': {
            '0': null,
            '1': null,
            '2': null,
            '3': null,
            '4': null,
            '5': null,
            '6': null
          }
        },
        'players': [
          'moi',
          'toi'
        ],
        'history': [
          {
            'player': 'moi',
            'row': 0,
            'column': 3
          },
          {
            'player': 'toi',
            'row': 1,
            'column': 3
          },
          {
            'player': 'moi',
            'row': 0,
            'column': 4
          },
          {
            'player': 'toi',
            'row': 2,
            'column': 3
          },
          {
            'player': 'moi',
            'row': 0,
            'column': 2
          },
          {
            'player': 'toi',
            'row': 3,
            'column': 3
          },
          {
            'player': 'moi',
            'row': 0,
            'column': 1
          }
        ],
        'player': 0,
        'finished': true,
        'id': 'ca2cf359-8c7d-4cd3-859d-97b72c948914'
      },
      'e2a670ec-72cf-437c-84ff-f9e8abfff896': {
        'matrix': {
          '0': {
            '0': null,
            '1': null,
            '2': null,
            '3': 0,
            '4': 1,
            '5': null,
            '6': null
          },
          '1': {
            '0': null,
            '1': null,
            '2': null,
            '3': 1,
            '4': 0,
            '5': null,
            '6': null
          },
          '2': {
            '0': null,
            '1': null,
            '2': null,
            '3': null,
            '4': 1,
            '5': null,
            '6': null
          },
          '3': {
            '0': null,
            '1': null,
            '2': null,
            '3': null,
            '4': null,
            '5': null,
            '6': null
          },
          '4': {
            '0': null,
            '1': null,
            '2': null,
            '3': null,
            '4': null,
            '5': null,
            '6': null
          },
          '5': {
            '0': null,
            '1': null,
            '2': null,
            '3': null,
            '4': null,
            '5': null,
            '6': null
          }
        },
        'players': [
          'toi',
          'moi'
        ],
        'history': [
          {
            'player': 'moi',
            'row': 0,
            'column': 3
          },
          {
            'player': 'toi',
            'row': 0,
            'column': 4
          },
          {
            'player': 'moi',
            'row': 1,
            'column': 4
          },
          {
            'player': 'toi',
            'row': 2,
            'column': 4
          },
          {
            'player': 'toi',
            'row': 1,
            'column': 3
          }
        ],
        'player': 1,
        'finished': false,
        'id': 'e2a670ec-72cf-437c-84ff-f9e8abfff896'
      },
      'undefined': {
        'player': 0
      }
    }
}

export function gamesReducer(state = INIT_STATE, action) {
    switch(action.type) {
        case '//init/state':
            return action.state.board
        case 'GAME:SET':
            return merge({}, state, {
                games: {
                    [action.id]: action.game
                }
            })

        case 'GAME:JOIN':
            // should this piece of logic be here?
            if(state.games[action.id].players.length>=2 || state.games[action.id].players.indexOf(action.playerId) !== -1) {
                return state
            }

            return merge({}, state, {games: {[action.id]: {
                players: [...state.games[action.id].players, action.playerId],
            }}})

        case 'GAME:PLAY':
            if(action.gameId) {
                console.warn('[DEPRECATED] GAME:PLAY - please use id instead of gameId')
                action.id = action.gameId
            }

            return merge({}, state, {
                games: {
                    [action.id]: {
                        matrix: {
                            [action.row]: {[action.column]: state.games[action.id].players.indexOf(action.playerId)}
                        },
                        history: [...state.games[action.id].history, {player: action.playerId, row: action.row, column: action.column}]
                    }
                }
            })

        case 'GAME:FINISH':
            if(action.gameId) {
                console.warn('[DEPRECATED] GAME:FINISH - please use id instead of gameId')
                action.id = action.gameId
            }

            return merge({}, state, {
                games: {
                    [action.id]: {
                        finished: true
                    }
                }
            })

        case 'GAME:SET_PLAYER':
            if(action.gameId) {
                console.warn('[DEPRECATED] GAME:SET_PLAYE - please use id instead of gameId')
                action.id = action.gameId
            }

            if(state.games[action.id].player !== action.playerId) {
                return merge({}, state, {games: {[action.id]: {player: action.playerId}}})
            }

            return state
    }

    return state
}
