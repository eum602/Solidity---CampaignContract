const path = require("path"); //garantiza
// que sea donde sea el entorno en que se corra
//no tenga problemas de ubicacion, nos ayuda a generar el path

const solc = require("solc");
//requerimos el compilador de solidity previamente instalado en la
//carpeta del proyecto

/*const fs = require('fs');
fs es el filesystem module que permite hacer lecturas sobre archivos,
este modulo es parte de la libreria estandar de node
Este nos da acceso a los archivos del sistema de nuestra computadora local*/
const fs = require("fs-extra");
/*fs-extra es el file system modeule, es un modulo que tiene
funciones adicionales*/

/*1. cada vez que este archivo se compile se eliminará la carpeta build, donde
se almacenen los archivos json que representan el contrato*/
/*para ello buscare la direccion*/
const buildPath = path.resolve(__dirname, "build");
/*const  lotteryPath = path.resolve(__dirname,'contracts','Lottery.sol');
dirname es una constante definida por node que siempre es ajustada
a la direccion absoluta de la carpeta de trabajo que contiene este
archivo.
El segundo y el tercer argumento van indicando en cascada las carpetas
y subcarpetas hasta llegar al archivo que contiene mi smartcontract*/
/*ahora que ya tengo la direccion de la carpeta build procedo a eliminarla*/
fs.removeSync(buildPath);
/*con removeSync podre borrar la carpte buildPath.
removeSync es una de las funcionalidades extra que viene con el modulo
fs-extra*/

/*2. entrando a la carpeta contracts para leer Campaign.sol*/
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
//ahora que ya hemos ruteado correctamente intentaremos leer
//el contenido
const source = fs.readFileSync(campaignPath, "utf-8");
//usamos el modulo fs para leer el archivo y codificarlo en formato
//utf-8
console.log(typeof(source))

/*3. Ahora compilando los dos contratos que se encuentran dentro del
archivo compile.js*/
const input = {
  language: 'Solidity',
  sources: {
      'campaign.sol': {
          content: source//'import ./contracts/Campaign.sol'
      }
  },
  settings: {
      outputSelection: {
          '*': {
              '*': [ '*' ]
          }
      }
  }
}

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['campaign.sol'];
/*de la compilacion solo rescato la propiedad llamada contracts*/
/*guardo el archivo compilado en output, este archivo tendra dos objetos
-Campaign
-CampaignFactory*/
/*verificando lo que tiene output*/
//console.log(output);
/*4. Almacenando el contenido de output*/
/*creando la carpeta build*/
fs.ensureDirSync(buildPath);
/*fs.ensureDirSync primero verificara si existe la ruta buildPath, de no existir
entonces creará tal ruta*/
/*Ahora pasando a almacenar cada contrato de output*/
for (let contract in output) {
  /*Como se menciono anteriormente, al compilar compile.js  se tendra la
  salida output, la cual tendra dos salidas. La primera propiedad es
  CampaignFactory, :CampaignFactory es la key la cual referencia a toda la
  salida del contrato CampaignFactory.
  La otra llave que referencia al contrato Campaign es :Campaign
  En cada iteracion la variable de iteracion contract toma el valor
  de :CampaignFactory
  y en la otra pasada la variable de iteracion contract toma el valor de
  :Campaign*/
  /*let itera sobre cada llave (:CampaignFactory y :Campaign) */
  fs.outputJsonSync(
    /*outputJsonSync va a escribir en un determinado
    archivo especificado en mi directorio :
    path.resolve( buildPath , contract + '.json' ) ==>primer argumento
    El segundo argumento sera output[contract] el cual indica el
    contenido que va a ir dentro de mi archivo*/
    //path.resolve( buildPath , contract + '.json' ),
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[
      contract
    ] /*replace(":", "") le quito el semicolon(:) para que los nombres
    de mis archivos json ya no tengan semicolon.*/
    /*contenido dentro del objeto output accediendo a
    determinado contrato através de su llave contract*/
  );
}

//console.log(solc.compile(source, 1));
//le pasamos el codigo fuente codificado en utf-8
//y le indicamos que solo queremos compilar 1 contrato
//asimismo mostraremos la compilacion en consola

//console.log(solc.compile(source, 1).contracts[':Inbox']);
//aqui al ponerle .contracts[':Inbox'] muestro en consola
//todo lo que esta adentro del contracts y especificamente el
//contrato llamado Inbox
/*el contrato inbox tiene dos propiedades una de ellas es bytecode(la cual
se deplegara)
y la otra es interface(hace referencia a un archivo ABI que permitira
conectar entre solidity y javascript), el archivo abi lista todas
las funciones usadas en el contrato*/

//le quitare el console.log y le pondre como un modulo exportable
//module.exports = solc.compile(source, 1).contracts[":Lottery"];
/*:Inbox indica el contrato que se va a exportar; los dos puntos son
para que en otro caso se pueda indicar la carpeta en donde esta,
por ejemplo asi: InboxContract:Inbox;   en este caso en vez de source
le tendria que inidcar la ruta de la carpeta que por ejemplo tiene subcarpetas
en donde en cada subcarpta esta cada contrato */
//al agregar module.exports estoy haciendo que este archivo pueda
//ser utilizado por otros archivos del proyecto, y especificamente
//pueda tener interface y bytecode(este ultimo para el despliegue)
