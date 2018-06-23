//previamente se instalo la wallet con npm install --save truffle-hdwallet-provider
/*truffle-hdwallet-provider permitira  va a ser la funcion del provider.
Es decir nos va a permitir conectar con la red rinkeby a traves de su nodo
Infura(una API), asimismo nos va a permitir desbloquear  una cuenta espedifica para
usar, de modo que sera nuestra fuente de ether.*/
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
//const { interface,bytecode } = require('./compile');
/*solo se desplegara una la instancia de CampaignFactory,
luego en la red se usara una de sus funciones llamadas createCampaign...
pero eso sera despues*/
const CompiledFactory = require("./build/CampaignFactory.json");
//const CompiledCampaign = require("../ethereum/build/Campaign.json");


const provider =new HDWalletProvider(
  //primero le especificare el mnemonico de mi cuenta:
  'poner tus doce palabras aqui',
  //ahora espeficando el link de la URL de la red a la que nos queremos conectar.
  //En este caso sera la red gratuita rinkeby, a traves del API de infura
  'poner el link de infura'
);//infura es gratuito
const web3 = new Web3(provider);/*pasando el provider, recientemente seteado,
al contructor Web3 y crando la instancia llamada web3; cabe mecionar que la
instancia web3 esta totalmente habilitada para acceder a la cuenta que le
especificamos al provider, asimismo a que red(en nuestro caso estamos usando
rinkeby)*/


/*Ahora es hora de deplegar el contrato, */

/*creare una funcion que sea asincrona, con el objetivo de usar la sintaxis
async-await, ello porque haremos una llamada,
porterior a ello llamaremos a esa funcion*/
const deploy = async ()=>{
  //primero obtendre todas las cuentas obtenidas del mnemonico, recordar que
  //un mnemonico contiene mas de una cuenta, esto se vio en un video pasado.
  const accounts = await web3.eth.getAccounts();
  //mostrando la primera cuenta del array:
  console.log('Attempting to deploy from account',accounts[0]);
  //0x1e8457e7d82203dba5c5804080D16494368Ea4C1 =>esta es la direccion de una de
  //mis cuentas en rinkeby
  const result = await new web3.eth.Contract(JSON.parse(CompiledFactory.interface))//interface jalado desde compile
    //.deploy({ data:'0x'+bytecode , arguments:['Hi there']})
    .deploy({ data:'0x'+CompiledFactory.bytecode})//mi contract no requiere datos
    //de inicializacion en mi constructor
    .send({gas:'1000000', from: accounts[0]});
  //result sera una instancia del contrato
  //console.log(interface);
  console.log('Contract deployed to',result.options.address);//imprimiendo el address
  //donde finalmente el contrato fue desplegado.
  //0x1dD2Db239Da28B15e5c3626d814d52F310ca5d18 (esto votó en la compilacion)
};
deploy();
/*node deploy.js*/
