'use strict';

Object.defineProperty(exports, "__esModule", {
                           value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _CampaignFactory = require('./build/CampaignFactory.json');

var _CampaignFactory2 = _interopRequireDefault(_CampaignFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*ahora creando una instancia de la interface para mas adelante poder conectar
con el contrato existente desplegado CampaignFactory*/

var instance = new _web2.default.eth.Contract(JSON.parse(_CampaignFactory2.default.interface), '0x3794C29868a00F665Acef568c08aff9900C8df4C' /*esta esta en la segunda cuenta*/
/*'0xee02A8C29Ab294B7089bdD555470DF751C5F3A8E'*/
/*'0x152C8ea033ee09FDf218D6812230C0559bE249C4'*/
/*'0x869C154275F9C683075Ab155528BD5683f499151' /*Esta es la direccion en donde
el contrato CampaignFactory fue desplegado*/
); /*importando la instancia web3 que
   fue creada en web3.js*/

/*importando el archivo que contiene el contrato factory en formato json*/
exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIkNhbXBhaWduRmFjdG9yeSIsImluc3RhbmNlIiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQWlCLEEsQUFBakIsQUFBTzs7OztBQUlQLEFBQU8sQUFBcUI7Ozs7OztBQUU1Qjs7O0FBR0EsSUFBTSxlQUFnQixjQUFBLEFBQUssSUFBVCxBQUFhLFNBQzdCLEtBQUEsQUFBSyxNQUFNLDBCQURLLEFBQ2hCLEFBQTJCLFlBRFgsQUFFaEIsNkNBQTZDO0FBQzdDO0FBQ0E7QUFKRixBQUFrQixBQUtoQixBQUlGOztBQVRrQixHQVRTOzs7QUFHM0I7a0JBZUEsQUFBZSIsImZpbGUiOiJmYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3VzdWFyaW8xL3Byb2plY3RzX3NvbGlkaXR5L2tpY2tzdGFydCJ9