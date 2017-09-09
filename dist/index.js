'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.instanceAction = exports.instanceReducer = exports.instanceState = exports.withInstance = exports.ejectReducer = exports.injectReducer = exports.createDynamix = undefined;

var _dynamix = require('./dynamix');

var _instance = require('./instance');

exports.createDynamix = _dynamix.createDynamix;
exports.injectReducer = _dynamix.injectReducer;
exports.ejectReducer = _dynamix.ejectReducer;
exports.withInstance = _instance.withInstance;
exports.instanceState = _instance.instanceState;
exports.instanceReducer = _instance.instanceReducer;
exports.instanceAction = _instance.instanceAction;