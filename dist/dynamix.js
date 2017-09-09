'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Private object holding references to global variables of the Dynamix namespace.
 */
var Dynamix = {
	dispatch: function dispatch() {},
	staticKeys: [],
	reducers: []

	/**
  * Enhances the root reducer (static, in this context) by dynamic reducers.
  * @param {function} staticReducer - the root reducer
  * @returns {function} The final reducer used by store.
  */
};var dynamize = function dynamize(staticReducer) {
	return function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var action = arguments[1];


		// compute next state for each dynamic slice of the state tree
		var nextDynamicState = {};
		Dynamix.reducers.forEach(function (x) {
			//nextDynamicState[x.key] = x.reducer(state[x.key], action)

			nextDynamicState[x.key] = _extends({ "__id": x.key }, x.reducer(state[x.key], action));
		});

		// delete dynamic slices of the state tree - root reducers doesn't have to care about them
		var dynamicKeys = Object.keys(state).filter(function (x) {
			return !Dynamix.staticKeys.includes(x);
		});
		dynamicKeys.forEach(function (key) {
			return delete state[key];
		});

		// compute the next state for static slice of the state tree
		var nextStaticState = staticReducer(state, action);

		// merge them together
		return _extends({}, nextStaticState, nextDynamicState);
	};
};

/**
 * Action types dispatched by Dynamix, prefixed by Dynamix namespace.
 * They are fired after injection or ejection and you can listen for them
 * in your reducers to be notified of changes.
 *
 * @property {string} REDUCER_INJECTED - An action type dispatched
 * when new dynamic reducer function has been injected.
 * Payload of action contains the key of the reducer.
 *
 * @property {string} REDUCER_EJECTED - An action type dispatched
 * when dynamic reducer function has been ejected.
 * Payload of action contains the key of the reducer.
 */
var ActionTypes = exports.ActionTypes = {
	REDUCER_INJECTED: '@@dynamix/REDUCER_INJECTED',
	REDUCER_EJECTED: '@@dynamix/REDUCER_EJECTED'

	/**
  * Creates a store enhancer that replaces the root reducer, passed to the store,
  * by enhanced reducer function. This new reducer function is responsible for computation of
  * dynamic slices of the state using dynamic reducers which has been injected to the pool.
  * Then merges the static slice of the state tree with all dynamic slices resulting in final state tree.
  *
  * @returns {object} A Redux store.
  *
  * @example
  * You can use 'compose' function that ships with Redux to combine Dynamix enhancer with middleware.
  * Because middleware is potentially asynchronous,
  * place the Dynamix enhancer after middleware in the composition chain (from right to left)
  *
  * ----------------------------------------------------------------------------
  * const enhancer = compose(createDynamix(), applyMiddleware(...middlewares))
  * const store = createStore(rootReducer, enhancer)
  * ----------------------------------------------------------------------------
  */
};var createDynamix = exports.createDynamix = function createDynamix() {
	return function (createStore) {
		return function (reducer, preloadedState, enhancer) {

			// create store by function provided by previous enhancer
			var store = createStore(reducer, preloadedState, enhancer);

			// save a reference to dispatch function
			Dynamix.dispatch = store.dispatch;

			// save keys of static slice of the state
			Dynamix.staticKeys = Object.keys(store.getState());

			// enhance the root reducer by handling of dynamic keys
			var dynamizedReducer = dynamize(reducer);

			// replace old reducer
			store.replaceReducer(dynamizedReducer);

			return store;
		};
	};
};

/**
 * Adds new reducer to dynamic reducers pool.
 * @param {string} key - A key, referencing the slice of the state computed by the reducer.
 * @param {function} reducer - A reducer function.
 * @event Dispatches an action where 'type' is set to ActionTypes.REDUCER_INJECTED and 'payload' is the key provided.
 */
var injectReducer = exports.injectReducer = function injectReducer(key, reducer) {

	// check whether dynamic reducer pool contains given key
	var isInjected = Dynamix.reducers.map(function (x) {
		return x.key;
	}).includes(key);
	if (isInjected) {
		console.warn('Reducer with key [' + key + '] has already been injected. Injection was ignored.');
		return;
	}

	// insert new reducer into pool
	Dynamix.reducers.push({
		key: key,
		reducer: reducer
	});

	// dispatch an event
	Dynamix.dispatch({
		type: ActionTypes.REDUCER_INJECTED,
		payload: key
	});
};

/**
 * Removes reducer associated with given key from dynamic reducers pool.
 * @param {string} key - A key, referencing the slice of the state computed by the reducer.
 * @event Dispatches an action where 'type' is set to ActionTypes.REDUCER_EJECTED and 'payload' is the key provided.
 */
var ejectReducer = exports.ejectReducer = function ejectReducer(key) {

	// check whether dynamic reducer pool contains given key
	var isInjected = Dynamix.reducers.map(function (x) {
		return x.key;
	}).includes(key);
	if (!isInjected) {
		console.warn('You attempted to eject reducer with key [' + key + '] but no such reducer has been injected. Ejection was ignored.');
		return;
	}

	// remove reducer from pool
	var index = Dynamix.reducers.findIndex(function (x) {
		return x.key === key;
	});
	Dynamix.reducers.splice(index, 1);

	// dispatch an event
	Dynamix.dispatch({
		type: ActionTypes.REDUCER_EJECTED,
		payload: key
	});
};

var log = function log() {
	console.log('Yes, master!');
};

exports.default = {
	createDynamix: createDynamix,
	injectReducer: injectReducer,
	ejectReducer: ejectReducer,
	ActionTypes: ActionTypes,
	log: log
};