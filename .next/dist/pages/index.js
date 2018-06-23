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

var _factory = require("../ethereum/factory.js");

var _factory2 = _interopRequireDefault(_factory);

var _semanticUiReact = require("semantic-ui-react");

var _Layout = require("../components/Layout.js");

var _Layout2 = _interopRequireDefault(_Layout);

var _routes = require("../routes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/home/usuario1/projects_solidity/kickstart/pages/index.js?entry"; /*https://react.semantic-ui.com/views/card#types-group-props*/
/*https://react.semantic-ui.com/elements/button#types-labeled-icon-shorthand*/
/*import 'semantic-ui-css/semantic.min.css';nextjs no tiene soporte para css
por eso esta linea de codigo no tiene soporte*/


var CampaignIndex = function (_Component) {
  (0, _inherits3.default)(CampaignIndex, _Component);

  function CampaignIndex() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CampaignIndex);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CampaignIndex.__proto__ || (0, _getPrototypeOf2.default)(CampaignIndex)).call.apply(_ref, [this].concat(args))), _this), _this.renderCampaigns = function () {
      var items = _this.props.campaigns.map(function (address) {
        return {
          header: address,
          description: _react2.default.createElement(_routes.Link, { route: "/campaigns/" + address, __source: {
              fileName: _jsxFileName,
              lineNumber: 47
            }
          }, _react2.default.createElement("a", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 48
            }
          }, "View campaign")), /*los parentesis son opcionales*/
          fluid: true /*hace que el texto este contenido en un marco de extremo a
                      extremo de su container*/
        };
      });

      return _react2.default.createElement(_semanticUiReact.Card.Group, { items: items, __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }); /*lo que se esta haciendo
          es crear las cards con los objetos que acabo de definir en la contante
          items*/
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CampaignIndex, [{
    key: "render",

    /*el render tiene que tener alguna salida de algo de jsx y tiene
    que ir obligatoriamente cada vez que se ejecute una llamada o algun cambio*/
    /*  en icon: "add" o "add circle"*/
    /*primary le da el estilo con color azul al boton*/
    value: function render() {
      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, _react2.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, _react2.default.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, "Open Campaigns"), _react2.default.createElement(_routes.Link, { route: "/campaigns/new", __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        }
      }, _react2.default.createElement("a", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, " ", _react2.default.createElement(_semanticUiReact.Button, {
        content: "Create Campaign",
        icon: "add circle",
        labelPosition: "left",
        floated: "right",
        primary: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        }
      }))), this.renderCampaigns()));
    }
  }], [{
    key: "getInitialProps",

    /*Component es la clase
    base de la libreria react */

    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var campaigns;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _factory2.default.methods.getDeployedCampaign().call();

              case 2:
                campaigns = _context.sent;
                return _context.abrupt("return", { campaigns: campaigns });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps() {
        return _ref2.apply(this, arguments);
      }

      return getInitialProps;
    }()

    /*implementando la funcion renderCampaigns*/

  }]);

  return CampaignIndex;
}(_react.Component);

/*
export default() => {
  return <h1>This is the new campaign page!</h1>;
}
*/

exports.default = CampaignIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiZmFjdG9yeSIsIkNhcmQiLCJCdXR0b24iLCJMYXlvdXQiLCJMaW5rIiwiQ2FtcGFpZ25JbmRleCIsInJlbmRlckNhbXBhaWducyIsIml0ZW1zIiwicHJvcHMiLCJjYW1wYWlnbnMiLCJtYXAiLCJoZWFkZXIiLCJhZGRyZXNzIiwiZGVzY3JpcHRpb24iLCJmbHVpZCIsIm1ldGhvZHMiLCJnZXREZXBsb3llZENhbXBhaWduIiwiY2FsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQWE7Ozs7QUFDcEIsQSxBQUFBLEFBQ0UsQUFDQTs7QUFLRixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBUyxBQUFZOzs7O3NGQUxPO0FBQzVCO0FBQ0E7Ozs7SSxBQUtNOzs7Ozs7Ozs7Ozs7OzswTkE2QkosQSxrQkFBa0I7VUFDVixjQUFRLEFBQUssTUFBTCxBQUFXLFVBQVgsQUFBcUIsSUFBSSxtQkFBVyxBQUNoRDs7a0JBQU8sQUFDRyxBQUNSO3VDQUNFLEFBQUMsOEJBQUssdUJBQU4sQUFBNkI7d0JBQTdCOzBCQUFBLEFBQ0E7QUFEQTtXQUFBLGtCQUNBLGNBQUE7O3dCQUFBOzBCQUFBO0FBQUE7QUFBQSxhQUpHLEFBR0gsQUFDQSxtQkFDVyxBQUNiO2lCQU5LLEFBTUUsS0FOVCxBQUFPLEFBTU8sQUFHZjs7QUFUUSxBQUNMO0FBRkosQUFBYyxBQVlkLE9BWmM7OzJDQWFaLEFBQUMsc0JBQUQsQUFBTSxTQUFNLE9BQVosQUFBbUI7b0JBQW5CO3NCQWRvQixBQWF0QixBQUNFO0FBQUE7T0FBQSxFQWRvQixBQUN0QixDQWNHLEFBR0o7OztBOzs7O1NBRUQ7O0FBRUE7O0FBQ0E7OzZCQUNTLEFBQ1A7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUVFO0FBRkY7QUFBQSx5QkFFRSxjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FGRixBQUVFLEFBSUEsbUNBQUEsQUFBQyw4QkFBSyxPQUFOLEFBQVk7b0JBQVo7c0JBQUEsQUFDRTtBQURGO3lCQUNFLGNBQUE7O29CQUFBO3NCQUFBLEFBQ0c7QUFESDtBQUFBLFNBQUEsQUFLRSxxQkFBQSxBQUFDO2lCQUFELEFBQ1UsQUFDUjtjQUZGLEFBRU8sQUFDTDt1QkFIRixBQUdnQixBQUNkO2lCQUpGLEFBSVUsQUFDUjtpQkFMRjs7b0JBQUE7c0JBWk4sQUFNRSxBQUNFLEFBS0UsQUFVSDtBQVZHO0FBQ0UsaUJBZlosQUFDRSxBQUNFLEFBc0JHLEFBQUssQUFJYjs7O1NBakZEOzs7Ozs7Ozs7Ozs7O3VCQWtCMEIsa0JBQUEsQUFBUSxRQUFSLEFBQ3JCLHNCQURxQixBQUVyQixBOzttQkFGRztBO2lEQUtDLEVBQUUsV0FBRixBOzs7Ozs7Ozs7Ozs7Ozs7QUFJVDs7Ozs7OztBLEFBNUIwQjs7QUFxRjVCLEFBS0E7Ozs7OztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9ob21lL3VzdWFyaW8xL3Byb2plY3RzX3NvbGlkaXR5L2tpY2tzdGFydCJ9