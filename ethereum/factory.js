import web3 from './web3'; /*importando la instancia web3 que
fue creada en web3.js*/

/*importando el archivo que contiene el contrato factory en formato json*/
import CampaignFactory from './build/CampaignFactory.json';

/*ahora creando una instancia de la interface para mas adelante poder conectar
con el contrato existente desplegado CampaignFactory*/

const instance =  new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3794C29868a00F665Acef568c08aff9900C8df4C' /*esta esta en la segunda cuenta*/
  /*'0xee02A8C29Ab294B7089bdD555470DF751C5F3A8E'*/
  /*'0x152C8ea033ee09FDf218D6812230C0559bE249C4'*/
  /*'0x869C154275F9C683075Ab155528BD5683f499151' /*Esta es la direccion en donde
  el contrato CampaignFactory fue desplegado*/
);

export default instance;
