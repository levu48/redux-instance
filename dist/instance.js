'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.instanceReducer = exports.instanceState = exports.instanceAction = exports.withInstance = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uuid = require('uuid');

var _dynamix = require('./dynamix');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withInstance = exports.withInstance = function withInstance(ComposedComponent) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(withInstance, _React$Component);

        function withInstance(props) {
            _classCallCheck(this, withInstance);

            var _this = _possibleConstructorReturn(this, (withInstance.__proto__ || Object.getPrototypeOf(withInstance)).call(this, props));

            _this.__id = ComposedComponent.displayName + ":" + (0, _uuid.v4)();
            (0, _dynamix.injectReducer)(_this.__id, props.__reducer);

            return _this;
        }

        _createClass(withInstance, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(ComposedComponent, _extends({ __id: this.__id }, this.props));
            }
        }]);

        return withInstance;
    }(_react2.default.Component), _class.propTypes = {
        __reducer: _propTypes2.default.func
    }, _class.defaultProps = {
        __reducer: function __reducer(state, action) {
            return state;
        }
    }, _temp;
};

var instanceAction = exports.instanceAction = function instanceAction(action, props) {
    return _extends({}, action, { __id: props.__id });
};

var instanceState = exports.instanceState = function instanceState(func) {
    return function (state, props) {
        return func(state[props.__id], props);
    };
};

var instanceReducer = exports.instanceReducer = function instanceReducer(reducer) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (state.__id && action.__id && state.__id === action.__id) {
            return reducer(state, action);
        }
        return state;
    };
};