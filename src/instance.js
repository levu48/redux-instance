import React from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';
import {injectReducer} from './dynamix';

export const withInstance = (ComposedComponent) => {
    return class withInstance extends React.Component {
        static propTypes = {
            __reducer: PropTypes.func
        }

        static defaultProps = {
            __reducer: (state, action) => state
        }

        constructor(props) {
            super(props);
            this.__id = ComposedComponent.displayName + ":" + v4();
            injectReducer(this.__id, props.__reducer);

        }
        render() {
            return <ComposedComponent __id={this.__id} {...this.props} />;
        }
    }
}

export const instanceAction = (action, props) => {
    return {...action, __id: props.__id}
}

export const instanceState = (func) => (state, props) => {
    return func(state[props.__id], props);
}

export const instanceReducer = (reducer) => (state = {}, action = {}) => {
    if (state.__id && action.__id && state.__id === action.__id) { 
        return reducer(state, action);
    }
    return state;
}