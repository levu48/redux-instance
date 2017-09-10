import {createStore, compose} from 'redux';
import {createDynamix} from 'redux-instance';

export default () => createStore((state, action) => state , {}, compose(createDynamix()));