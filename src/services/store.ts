/// <reference path="../../typings/tsd/redux/redux.d.ts" />
/// <reference path="../../typings/tsd/redux-logger/redux-logger.d.ts" />

import {createStore,combineReducers,applyMiddleware} from 'redux';
// const createStore = Redux.createStore;
// const combineReducers = Redux.combineReducers;
// const applyMiddleware = Redux.applyMiddleware;

var createLogger = require('redux-logger');

import {gamesReducer} from './reducers';

export const newStore = applyMiddleware(
          createLogger({collapsed:true})
        )(createStore);

export const store = newStore(combineReducers({board:gamesReducer}));
