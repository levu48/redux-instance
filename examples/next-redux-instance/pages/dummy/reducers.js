import {ActionTypes} from './actions';

const initialState = {};

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.INIT:
            return initialState;

        case ActionTypes.HARVEY:
            return { ...state, storm: ActionTypes.HARVEY};

        case ActionTypes.IRMA:
            return { ...state, storm: ActionTypes.IRMA};

        default:
            return state;
    }

}

export const reducer2 = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.INIT:
            return initialState;

        case ActionTypes.HARVEY:
            return { ...state, storm: ActionTypes.HARVEY + " ***"};

        case ActionTypes.IRMA:
            return { ...state, storm: ActionTypes.IRMA + " ***"};

        default:
            return state;
    }

}