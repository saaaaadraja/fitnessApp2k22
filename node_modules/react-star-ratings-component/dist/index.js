"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactStarRating = function (_Component) {
  _inherits(ReactStarRating, _Component);

  function ReactStarRating(props) {
    _classCallCheck(this, ReactStarRating);

    var _this = _possibleConstructorReturn(this, (ReactStarRating.__proto__ || Object.getPrototypeOf(ReactStarRating)).call(this, props));

    _this.state = {
      numberOfSelectedStar: props.numberOfSelectedStar - 1
    };
    _this.onSelectStar = _this.onSelectStar.bind(_this);
    return _this;
  }

  _createClass(ReactStarRating, [{
    key: "onSelectStar",
    value: function onSelectStar(val) {
      var _props = this.props,
          disableOnSelect = _props.disableOnSelect,
          onSelectStar = _props.onSelectStar;

      if (!disableOnSelect) {
        this.setState({
          numberOfSelectedStar: val
        });
        onSelectStar(val + 1);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          numberOfStar = _props2.numberOfStar,
          colorFilledStar = _props2.colorFilledStar,
          starSize = _props2.starSize,
          spaceBetweenStar = _props2.spaceBetweenStar,
          colorEmptyStar = _props2.colorEmptyStar;
      var numberOfSelectedStar = this.state.numberOfSelectedStar;

      var starlist = [];

      var _loop = function _loop(i) {
        starlist.push(_react2.default.createElement(
          "span",
          {
            className: "star",
            key: i,
            style: {
              fontSize: starSize,
              color: i <= numberOfSelectedStar ? colorFilledStar : colorEmptyStar,
              marginLeft: spaceBetweenStar,
              overflow: "hidden"
              // width: numberOfSelectedStar>i && numberOfSelectedStar<i+1? ' ': starSize
            },
            onMouseDown: function onMouseDown() {
              return _this2.onSelectStar(i);
            }
          },
          "\u2605"
        ));
      };

      for (var i = 0; i < numberOfStar; i++) {
        _loop(i);
      }
      return _react2.default.createElement(
        "div",
        { className: "star-rating-container" },
        _react2.default.createElement(
          "div",
          { className: "star-list" },
          starlist
        )
      );
    }
  }]);

  return ReactStarRating;
}(_react.Component);

ReactStarRating.defaultProps = {
  numberOfStar: 5,
  colorFilledStar: "orange",
  colorEmptyStar: "#000",
  starSize: "20px",
  spaceBetweenStar: "10px",
  disableOnSelect: true
};

ReactStarRating.propTypes = {
  numberOfStar: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  colorFilledStar: _propTypes2.default.string,
  colorEmptyStar: _propTypes2.default.string,
  starSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  onSelectStar: _propTypes2.default.func,
  spaceBetweenStar: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  disableOnSelect: _propTypes2.default.bool
};

exports.default = ReactStarRating;