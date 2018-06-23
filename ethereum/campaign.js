import web3 from "./web3";
import Campaign from "./build/Campaign.json";

export default address => {/*esta sera una funcion cuyo paramentro de entrada
  sera la direccion del contrato, lo llamo en show.js*/
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
  /*new porque estoy creando una nueva instancia para acceder al contrato existente
  */
};
