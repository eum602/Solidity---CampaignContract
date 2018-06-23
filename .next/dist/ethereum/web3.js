"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require("web3");

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Web 3 (capiltalized) es el contructor
/*const web3 = new Web3(window.web3.currentProvider);
Este archivo se ejecuta cuando lo llama metamask dentro del servidor y
cuando lo ejecuta nextjs.*/
/*window.web3.currentProvider: esto jala el provider
window: es una variable global
window.web3:===>web3 Es una variable global.
Metamask inyecta  mediante "window.web3" la libreria web2.0
detro de la variable global web3
currentProvider: Es el provider que es instalado en la copia de web3
que ha sido instalado por metamask. Dicho currentProvider es el que me
permite ingresar a las redes de ethereum, ya que almacena las llaves pubicas
y privadas de las cuentas que haya creado.
Web3 (capiltalized): sera mi copia local de Web3 a la que le
almacenaré el currentProvider
Finalmente creo una INSTANCIA llamada web3*/
var web3 = void 0;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  /*chequeando si la variable global
  window esta definida, window es un objeto*/
  /*typeof window !== 'undefined' : el codigo se ejecuta en el web browser???
  typeof window.web3 !== 'undefined' : metamask ha inyectado web3 (metamask esta corriendo)???
  */

  web3 = new _web2.default(window.web3.currentProvider);
} else {
  /*estamos en el SERVIDOR o el usuario no esta corriendo metamask*/
  /*En este caso creare mi propio proveedor*/
  var provider = new _web2.default.providers.HttpProvider(
  //ahora espeficando el link de la URL de la red a la que nos queremos conectar.
  //En este caso sera la red gratuita rinkeby, a traves del API de infura (hará de nodo)
  "https://rinkeby.infura.io/xXsA5BSVwfRc79yQAU26");
  web3 = new _web2.default(provider);
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJjdXJyZW50UHJvdmlkZXIiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQLEE7Ozs7OztBQUF5QjtBQUN6Qjs7O0FBR0E7Ozs7Ozs7Ozs7OztBQVlBLElBQUksWUFBSjtBQUNBLElBQUksT0FBTyxBQUFQLFdBQWtCLEFBQWxCLGVBQWlDLE9BQU8sT0FBTyxBQUFkLFNBQXVCLEFBQTVELGFBQXlFLEFBQ3ZFO0FBRUE7O0FBSUE7Ozs7U0FBTyxBQUFJLEFBQUosa0JBQVMsT0FBTyxBQUFQLEtBQVksQUFBckIsQUFBUCxBQUNEO0FBUkQsT0FRTyxBQUNMO0FBQ0E7QUFDQTtNQUFNLFdBQVcsSUFBSSxjQUFLLEFBQUwsVUFBZSxBQUFuQixBQUNmO0FBQ0E7QUFDQTtBQUhlLEFBQWpCLEFBS0E7U0FBTyxBQUFJLEFBQUosa0JBQVMsQUFBVCxBQUFQLEFBQ0Q7QUFFRDs7a0JBQWUsQUFBZiIsImZpbGUiOiJ3ZWIzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3VzdWFyaW8xL3Byb2plY3RzX3NvbGlkaXR5L2tpY2tzdGFydCJ9