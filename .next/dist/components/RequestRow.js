"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require("semantic-ui-react");

var _web = require("../ethereum/web3");

var _web2 = _interopRequireDefault(_web);

var _campaign = require("../ethereum/campaign");

var _campaign2 = _interopRequireDefault(_campaign);

var _routes = require("../routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/home/usuario1/projects_solidity/kickstart/components/RequestRow.js";


var RequestRow = function (_Component) {
  (0, _inherits3.default)(RequestRow, _Component);

  function RequestRow() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RequestRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestRow.__proto__ || (0, _getPrototypeOf2.default)(RequestRow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      loading1: false,
      loading2: false,
      errorMessage: ""
    }, _this.onApprove = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var accounts, campaign;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({ loading1: true });
              _context.prev = 1;
              _context.next = 4;
              return _web2.default.eth.getAccounts();

            case 4:
              accounts = _context.sent;
              _context.next = 7;
              return (0, _campaign2.default)(_this.props.address);

            case 7:
              campaign = _context.sent;
              _context.next = 10;
              return campaign.methods.approveRequest(_this.props.id).send({
                from: accounts[0]
              });

            case 10:
              _routes.Router.replace("/campaigns/" + _this.props.address + "/requests");
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](1);

              _this.setState({ errorMessage: _context.t0.message });

            case 16:
              _this.setState({ loading1: false });

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 13]]);
    })), _this.onFinalize = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var accounts, campaign;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.setState({ loading2: true });
              _context2.prev = 1;
              _context2.next = 4;
              return _web2.default.eth.getAccounts();

            case 4:
              accounts = _context2.sent;
              _context2.next = 7;
              return (0, _campaign2.default)(_this.props.address);

            case 7:
              campaign = _context2.sent;
              _context2.next = 10;
              return campaign.methods.finalizeRequest(_this.props.id).send({
                from: accounts[0]
              });

            case 10:
              _routes.Router.replace("/campaigns/" + _this.props.address + "/requests");
              _context2.next = 16;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](1);

              _this.setState({ errorMessage: _context2.t0.message });

            case 16:
              _this.setState({ loading2: false });

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[1, 13]]);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RequestRow, [{
    key: "render",
    value: function render() {
      var Row = _semanticUiReact.Table.Row,
          Cell = _semanticUiReact.Table.Cell;
      var _props = this.props,
          id = _props.id,
          request = _props.request,
          approversCount = _props.approversCount;

      var readyToFinalize = request.approvalCount > approversCount / 2;

      return _react2.default.createElement(Row, { disabled: request.complete, positive: readyToFinalize && !request.complete, __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, id), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, request.description), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, _web2.default.utils.fromWei(request.value, "ether")), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, request.recipient), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }, request.approvalCount, " / ", approversCount), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }, request.complete ? null : _react2.default.createElement(_semanticUiReact.Button, {
        color: "green",
        basic: true,
        onClick: this.onApprove,
        loading: this.state.loading1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }, "Approve")), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, request.complete ? null : _react2.default.createElement(_semanticUiReact.Button, {
        color: "teal",
        basic: true,
        onClick: this.onFinalize,
        loading: this.state.loading2,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, "Finalize")));
    }
  }]);

  return RequestRow;
}(_react.Component);

exports.default = RequestRow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUmVxdWVzdFJvdy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlRhYmxlIiwiQnV0dG9uIiwiTWVzc2FnZSIsIndlYjMiLCJDYW1wYWlnbiIsIlJvdXRlciIsIlJlcXVlc3RSb3ciLCJzdGF0ZSIsImxvYWRpbmcxIiwibG9hZGluZzIiLCJlcnJvck1lc3NhZ2UiLCJvbkFwcHJvdmUiLCJzZXRTdGF0ZSIsImV0aCIsImdldEFjY291bnRzIiwiYWNjb3VudHMiLCJwcm9wcyIsImFkZHJlc3MiLCJjYW1wYWlnbiIsIm1ldGhvZHMiLCJhcHByb3ZlUmVxdWVzdCIsImlkIiwic2VuZCIsImZyb20iLCJyZXBsYWNlIiwibWVzc2FnZSIsIm9uRmluYWxpemUiLCJmaW5hbGl6ZVJlcXVlc3QiLCJSb3ciLCJDZWxsIiwicmVxdWVzdCIsImFwcHJvdmVyc0NvdW50IiwicmVhZHlUb0ZpbmFsaXplIiwiYXBwcm92YWxDb3VudCIsImNvbXBsZXRlIiwiZGVzY3JpcHRpb24iLCJ1dGlscyIsImZyb21XZWkiLCJ2YWx1ZSIsInJlY2lwaWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQU8sQUFBUTs7QUFDeEIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFRLEFBQWE7Ozs7Ozs7SSxBQUVmOzs7Ozs7Ozs7Ozs7Ozs7b04sQUFDSjtnQkFBUSxBQUNJLEFBQ1Y7Z0JBRk0sQUFFSSxBQUNWO29CLEFBSE0sQUFHUTtBQUhSLEFBQ04sYSxBQUtGLHFGQUFZLG1CQUFBO29CQUFBO29FQUFBO2tCQUFBOzJDQUFBO2lCQUNWO29CQUFBLEFBQUssU0FBUyxFQUFFLFVBRE4sQUFDVixBQUFjLEFBQVk7OEJBRGhCOzhCQUFBO3FCQUdlLGNBQUEsQUFBSyxJQUhwQixBQUdlLEFBQVM7O2lCQUExQjtBQUhFLGtDQUFBOzhCQUFBO3FCQUllLHdCQUFTLE1BQUEsQUFBSyxNQUo3QixBQUllLEFBQW9COztpQkFBckM7QUFKRSxrQ0FBQTs4QkFBQTs4QkFLRixBQUFTLFFBQVQsQUFBaUIsZUFBZSxNQUFBLEFBQUssTUFBckMsQUFBMkMsSUFBM0MsQUFBK0M7c0JBQzdDLFNBTkEsQUFLRixBQUFvRCxBQUNsRCxBQUFTO0FBRHlDLEFBQ3hELGVBREk7O2lCQUdOOzZCQUFBLEFBQU8sd0JBQXNCLE1BQUEsQUFBSyxNQUFsQyxBQUF3QyxVQVJoQzs4QkFBQTtBQUFBOztpQkFBQTs4QkFBQTs4Q0FVUjs7b0JBQUEsQUFBSyxTQUFTLEVBQUUsY0FBYyxZQVZ0QixBQVVSLEFBQWMsQUFBb0I7O2lCQUVwQztvQkFBQSxBQUFLLFNBQVMsRUFBRSxVQVpOLEFBWVYsQUFBYyxBQUFZOztpQkFaaEI7aUJBQUE7OEJBQUE7O0FBQUE7K0JBQUE7QSxlQWVaLEEsc0ZBQWEsb0JBQUE7b0JBQUE7c0VBQUE7a0JBQUE7NkNBQUE7aUJBQ1g7b0JBQUEsQUFBSyxTQUFTLEVBQUUsVUFETCxBQUNYLEFBQWMsQUFBWTsrQkFEZjsrQkFBQTtxQkFHYyxjQUFBLEFBQUssSUFIbkIsQUFHYyxBQUFTOztpQkFBMUI7QUFIRyxtQ0FBQTsrQkFBQTtxQkFJYyx3QkFBUyxNQUFBLEFBQUssTUFKNUIsQUFJYyxBQUFvQjs7aUJBQXJDO0FBSkcsbUNBQUE7K0JBQUE7OEJBS0gsQUFBUyxRQUFULEFBQWlCLGdCQUFnQixNQUFBLEFBQUssTUFBdEMsQUFBNEMsSUFBNUMsQUFBZ0Q7c0JBQzlDLFNBTkMsQUFLSCxBQUFxRCxBQUNuRCxBQUFTO0FBRDBDLEFBQ3pELGVBREk7O2lCQUdOOzZCQUFBLEFBQU8sd0JBQXNCLE1BQUEsQUFBSyxNQUFsQyxBQUF3QyxVQVIvQjsrQkFBQTtBQUFBOztpQkFBQTsrQkFBQTtnREFVVDs7b0JBQUEsQUFBSyxTQUFTLEVBQUUsY0FBYyxhQVZyQixBQVVULEFBQWMsQUFBb0I7O2lCQUVwQztvQkFBQSxBQUFLLFNBQVMsRUFBRSxVQVpMLEFBWVgsQUFBYyxBQUFZOztpQkFaZjtpQkFBQTsrQkFBQTs7QUFBQTtnQ0FBQTtBOzs7Ozs2QkFlSjtVQUFBLEFBQ0MsTUFERCxBQUNlLHVCQURmLEFBQ0M7VUFERCxBQUNNLE9BRE4sQUFDZSx1QkFEZixBQUNNO21CQUMyQixLQUZqQyxBQUVzQztVQUZ0QyxBQUVDLFlBRkQsQUFFQztVQUZELEFBRUssaUJBRkwsQUFFSztVQUZMLEFBRWMsd0JBRmQsQUFFYyxBQUNyQjs7VUFBTSxrQkFBa0IsUUFBQSxBQUFRLGdCQUFnQixpQkFBaEQsQUFBK0QsQUFFL0Q7OzZCQUNHLGNBQUQsT0FBSyxVQUFVLFFBQWYsQUFBdUIsVUFBVSxVQUFhLG1CQUFtQixDQUFDLFFBQWxFLEFBQTBFO29CQUExRTtzQkFBQSxBQUNFO0FBREY7T0FBQSxrQkFDRyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSxTQURGLEFBQ0UsQUFDQSxxQkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSxpQkFGRixBQUVFLEFBQWUsQUFDZiw4QkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSx1QkFBTyxBQUFLLE1BQUwsQUFBVyxRQUFRLFFBQW5CLEFBQTJCLE9BSHBDLEFBR0UsQUFBTyxBQUFrQyxBQUN6QywyQkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSxpQkFKRixBQUlFLEFBQWUsQUFDZiw0QkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUNHO0FBREg7QUFBQSxpQkFBQSxBQUNXLGVBQWtCLE9BTi9CLEFBS0UsQUFJQSxpQ0FBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUNHO0FBREg7QUFBQSxpQkFDRyxBQUFRLFdBQVIsQUFBbUIsdUJBQ2xCLEFBQUM7ZUFBRCxBQUNRLEFBQ047ZUFGRixBQUdFO2lCQUFTLEtBSFgsQUFHZ0IsQUFDZDtpQkFBUyxLQUFBLEFBQUssTUFKaEIsQUFJc0I7O29CQUp0QjtzQkFBQTtBQUFBO0FBQ0UsT0FERixFQVhOLEFBU0UsQUFFSSxBQVVKLDZCQUFDLGNBQUQ7O29CQUFBO3NCQUFBLEFBQ0c7QUFESDtBQUFBLGlCQUNHLEFBQVEsV0FBUixBQUFtQix1QkFDbEIsQUFBQztlQUFELEFBQ1EsQUFDTjtlQUZGLEFBR0U7aUJBQVMsS0FIWCxBQUdnQixBQUNkO2lCQUFTLEtBQUEsQUFBSyxNQUpoQixBQUlzQjs7b0JBSnRCO3NCQUFBO0FBQUE7QUFDRSxPQURGLEVBeEJSLEFBQ0UsQUFxQkUsQUFFSSxBQWVUOzs7OztBQWpGc0IsQSxBQW9GekI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiUmVxdWVzdFJvdy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS91c3VhcmlvMS9wcm9qZWN0c19zb2xpZGl0eS9raWNrc3RhcnQifQ==