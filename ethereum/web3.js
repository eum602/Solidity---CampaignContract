import Web3 from "web3"; //Web 3 (capiltalized) es el contructor
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
let web3;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  /*chequeando si la variable global
  window esta definida, window es un objeto*/
  /*typeof window !== 'undefined' : el codigo se ejecuta en el web browser???
typeof window.web3 !== 'undefined' : metamask ha inyectado web3 (metamask esta corriendo)???
*/

  web3 = new Web3(window.web3.currentProvider);
} else {
  /*estamos en el SERVIDOR o el usuario no esta corriendo metamask*/
  /*En este caso creare mi propio proveedor*/
  const provider = new Web3.providers.HttpProvider(
    //ahora espeficando el link de la URL de la red a la que nos queremos conectar.
    //En este caso sera la red gratuita rinkeby, a traves del API de infura (hará de nodo)
    "https://rinkeby.infura.io/xXsA5BSVwfRc79yQAU26"
  );
  web3 = new Web3(provider);
}

export default web3;
