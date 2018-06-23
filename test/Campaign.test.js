const assert = require("assert");
//assert es una libreria estandar construida dentro de nodejs runtime
//es usada para hacer afirmaciones acerca de testeos, por lo que
//sera usado por ejemplo para verificar si una variable es igual a otra

const ganache = require("ganache-cli");
//ganache servira como una red local de ethereum para testeo
//A diferencia de una red real, todas las transacciones realizadas con GANACHE
//son casi instantaneas.

const Web3 = require("web3");
//notar que Web3 la hemos empezado con mayuscula como una forma de
//indicar que lo que en realidad se esta importando es un constructor
//(o una clase vista desde el punto de vista de javascript)
//el cual sera utilizado para crear instancias de la libreria web3
//el proposito de cada instancia es establecer conecciones a diferentes
//redes ethereum
//pero lo usual seria solo usar una instancia y thus trabajar
//con una instancia para determinado momento.
//la instancia creada se debera configurar  un provider, el cual es
//como una capa de comunicacion entre web3 y una determinada red
//Cada provider tiene diferentes metodos dentro de el, al setear
//el provider seremos capaces de enviar requests hacia la red local
//y luego mediante ese proveedor tambien recibir una response desde dicha
//red
//provider es como un celular, ganache y web3 dos personas que se
//van a comunicar.
//los providers puden ser reemplazados y asi comunicarse con otra red.

//instanciando Web3
web3 = new Web3(ganache.provider());
/*estamos creando una nueva instancia y le estamos diciendo
que intente conectar con esta red local que estamos teniendo
en la pc
Cuando se intente conectar con otra red ethereum como rinkeby
o la main network=> se reemplazara ganache.provider() por otro
provider

Ganache.provider generara cuentas que podremos utilizar en nuestra red
#local GANACHE. usaremos al contructor (o clase en javascript) para
acceder a dichas cuentas generadas por GANACHE.
Estas cuentas estaran configuradas para enviar y recibir ether sin
tener en cuenta los requerimientos de seguridad.

*/

/*const { interface, bytecode } = require('../compile');//jalando
{} indica que lo que estamos jalando es un objeto  que tiene dos propiedades.
 compile.js para obtener interface (ABI) y bytecode, recordar que compile.js
esta configurado  para exportar archivos*/
const CompiledFactory = require("../ethereum/build/CampaignFactory.json");
const CompiledCampaign = require("../ethereum/build/Campaign.json");

/*no lo he usado
// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
const provider = ganache.provider();
const web3 = new Web3(provider);
*/

/////////////////////////////////////////////////////////////////////////
//////////////////ACCEDIENDO  A LAS CUENTAS GENERADAS EN GANACHE/////////
/*Ganache.provider generara cuentas que podremos utilizar en nuestra red
#local GANACHE. usaremos al contructor (o clase en javascript) para
acceder a dichas cuentas generadas por GANACHE.
Estas cuentas estaran configuradas para enviar y recibir ether sin
tener en cuenta los requerimientos de seguridad.
*/
let accounts; //declarando de manera global la variable accounts para que pueda
//ser reasignada cada vez que se ejecuta el before each.
let factory; /*Esta sera una instancia del contrato CampaignFactory desplegado que se
va a realizar*/
let campaignAddress;
let campaign;
//const INITIAL_MESSAGE='Hi there this a new instance';
beforeEach(async () => {
  //agregando async para asegurarme que esta funcion sera
  //asicnrona y asi se pueda usar la sintaxis await mas abajo
  //get a list of accounts generated hy Ganache
  /*ahora en vez de then el cual es parte de promise se usara
  la sintaxis async await . Entonces este codigo:
    .then(fetchedAccounts=>{console.log(fetchedAccounts);
    });  sera reemplazao asi:*/
  accounts = await web3.eth.getAccounts(); //agregando el punto y coma para agregar
  //la sintaxis async/await
  //await espera hasta que web3/eth/getAccounts me obtenga las cuentas.
  /*accediendo a las cuentas mediante la instancia web3
  en uno de sus modulos llamado eth y dentro de esta accediendo a
  su funcion getAccounts();
  cabe resaltar que todas las funciones en la libreria web3 son asincronas,
  esto quiere decir que siempre estará retornando una promise que sera resuelta
  con alguna de las cuentas que obtendremos
  */

  //mostrando todas las accounts de GANACHE
  //local test network
  /*Estas cuentas varian en cada corrida de web3
  [ '0x4914EF44Bd0317EAB4BC54cB8Ca8ba1C1Ba4ea59',
    '0x5848248b281520F034c9D9da4a3Eb6aE91fefe68',
    '0x5C8AA8CC26e237B68Cc0173Eb1Aa34178398476D',
    '0x90a6a47C4c6050aD94626502604C81482b8C3e8E',
    '0x662aFE9AAf768974f709b4C2814Ab41390EAD335',
    '0x2C32dF2CFEE10395F32690f1eFbB11a44Ed1eDba',
    '0x8C9e15409DA00c20e944d99F4A84f5a965630eAA',
    '0x6DDFBB6356cB8f8a3dEeAbE17052D6CE0f306F93',
    '0x7755fcCF50e3Ceb079DbA49effdA3c0F3C14eD2c',
    '0xcC69d583A5fc43Ad80C004D7a962ceC508761C6E' ]



  */
  //recordar que GANACHE es solo para testeo !

  //use one of those accounts to deploy our contract
  //ahora si desplegando!!!!!!!!
  //lottery me devolvera una REFERENCIA DIRECTA al contrato lottery
  //será un objeto javascript
  factory = await new web3.eth.Contract(JSON.parse(CompiledFactory.interface))
    /*creating and deployment es asincrono por eso uso la
  sintaxis async/await*/
    /* Contract la cual es una funcion constructor (y una propiedad)
  (en javascript es CLASE), entonces lo que se esta haciendo es crear una
   instancia de Contract , Web 3 a traves de su propiedad
   Contract nos permite interactuar con otros
   contratos que existen en la red o contratos que creas y
   despliegas

   JSON.parse(interface) : Es el argumento que pasamos a la propiedad
   contract , notar que hacemos el parse para convertir de formato JSON
   a formato objeto de javascript.
   */
    //.deploy({data:bytecode, arguments:[INITIAL_MESSAGE]}  )
    //.deploy({data:bytecode}  )
    .deploy({ data: CompiledFactory.bytecode })

    /*
  Por otro lado deploy es el metodo  de web3 que estamos amarrando
  a la salida de la instancia de Contract, data hace refencia a
  nuestro bytecode recordar que en mi contrato Inbox tiene un constructor
  que pide un mensaje de entrada.

  arguments:['hola Erick'] es un array y ello indica que puede aceptar
  mas de una entrada, por ejemplo si en mi contructor le mando otra entrada
  entonces pondria otro valor mas al array  para incorporarlo a arguments
  Para ser mas especifico, deploy no despliega nada, sino mas bien
  crea un objeto que posteriormente sera desplegado en la red.
  */
    .send({ from: accounts[0], gas: "1000000" });
  /*aqui le estoy dando la direccion
    de la cuenta sobre la que quiero desplegar mi contrato
    ademas le indico la cantida de gas que puede utilizar para
     el despligue
     Send establece la comunicacion desde web3 hacia la red.
     */

  // ADD THIS ONE LINE RIGHT HERE!!!!! <---------------------
  //inbox.setProvider(provider);//no lo he usado

  /*Desplegando una instancia del contrato Campaign*/
  await factory.methods.createCampaign("100").send({
    /*le pondre
       minimo 100 de wei, es decir siempre que se quiera crear una campaign
       enotnces como minimo se debera abonar 100wei*/
    from:
      accounts[0] /*este sera el manager del Campaign, que para el
       ejemplo sera la misma persona que administra el CampaignFactory*/,
    gas: "1000000"
  });

  /*ahora jalando la campaña que acabo de crear*/
  /*const addresses = await factory.methods.getDeployedCampaigns().call();
     campaignAddress = addresses[0];*/
  /*con ES6*/
  [campaignAddress] = await factory.methods.getDeployedCampaign().call();
  /*solo se toma el primer elemento del array que almacena las direcciones
     de los contratos Campaign almacenados*/

  /*Ahora se creara una interfaz para poder interactuar con el contrato*/

  campaign = await new web3.eth.Contract(
    JSON.parse(CompiledCampaign.interface),
    campaignAddress /*este segundo argumento es la direccion donde esta
       desplegado el contrato*/
  );
});

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
////////****testing with mocha////////****
/*mocha es usado para testear codigo en javascript
*/
describe("Campaigns", () => {
  //esta es la arrow function
  it("Deploys a factory and a campaign!", () => {
    //console.log(accounts);//mostrando las cuentas obtenidas lineas arroba
    //console.log(inbox);
    assert.ok(factory.options.address); //assert MODULE es parte de la
    //libreria NODE.
    //el metodo OK es una verificacion de falsy o truthy acerca del
    //argumento.
    //verificando si la propiedad address esta definida
    //dentro del objeto options; address es la direccion donde el
    //contrato ha sido desplegado.
    //De ser definida nos dara cierta garantia que el contrato ha sido
    //desplegado
    assert.ok(campaign.options.address);
  });

  it("Asigna al que llama a la funcion como el manager del contrato", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager); /*lo que espero que sea y lo que es  */
  });

  it("Permite a la gente contribuir y luego ser puesto como aprobadores", async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: "200" //web3.eth.toWei('0.001','ether');
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    /*Estoy verificando en la variable approvers de tipo mapping pasandole
    la direccion de accounts[1], para ver si me devuelve un true*/
    assert(isContributor); //es verdadero o falso?
  });

  it("requiere una minima contribucion", async () => {
    try {
      await campaign.methods
        .contribute()
        .send({ from: accounts[2], value: 99 }); //en este caso value en wei
      /*{from:accounts[1] , value: web3.utils.toWei('0.02','ether') });
        En este caso esta linea tb corre porque es valida*/

      assert(
        false
      ); /*si por algun motivo hay algun error u otra
      cosa que escape al alcance de error del catch,entonces
      saltara a esta linea, donde pondre que hubo un error,
      lo que significa que el test terminara aqui mismo.
      si la transaccion resulta erronea por no verificarse la restriccion
      de que solo el manager puede ejecutar esta funcion, entonces
      assert(false) no se ejecutara y por haber un error
      pasara al catch donde se verificara que en efeceto hubo un error */
    } catch (err) {
      assert(err);
      //assert.ok(err) //asser verificar la existencia del argumento err
      /*el testeo botara verdadero porque al poner solo un wei entonces entrara
      al catch y assert sera verdadero porque se verifica que hay un error*
      tener en cuenta que async-await no trabaja bien con el helper throw de node
      por lo que esta parte es limitada*/
    }
  });

  /******************************************************************/
  it("Permite al manager hacer un requerimiento de pago", async () => {
    await campaign.methods
      .createRequest("Compra de paneles solares", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000"
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal("Compra de paneles solares", request.description);
  });
  /*******************************************************************/
  it("processes requests", async () => {
    /*contribuyendo*/
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether")
    });
    /*creando un request*/
    await campaign.methods
      .createRequest(
        "Compra de paneles solares",
        web3.utils.toWei("5", "ether"),
        accounts[1]
      )
      .send({
        from: accounts[0],
        gas: "1000000"
      });
    /*aprobando la requisicion*/
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });
    /*verificando el balance de accounts[0] antes de la transferencia
    const balance_init = web3.eth.getBalance(accounts[1]);
    console.log(balance_init); //Promise { <pending> }
    no se puede obtener el balance antes de usar la account
    */
    /*finalizando la requisicion*/
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });
    /*verificando que la cuenta accounts[1] haya recibido el dinero*/
    let balance = await web3.eth.getBalance(accounts[1]);/*esto retorna un string
    que representa una cantidad en wei*/
    balance = web3.utils.fromWei(balance,'ether');/*pasando de un string en  wei
    a un string que representa la cantidad pero en ether*/
    /*ahora pasando el string de ethers a un float que representa la cantidad
    en ethers*/
    balance = parseFloat(balance);
    //console.log(balance);//104.99875498
    assert(balance>100);/*se verifica con los decimales que ha habido una
    transaccion*/

  });
});

/*probando cada metodo implementado*/
/*1*/
/*------
  it('Allows one account to enter',async()=>{
    await lottery.methods.enter().send(
      {from:accounts[0],
      //value: '1000000000'//esto esta en wei
      //otra forma mas clara de poner el valor a enviar
      value: web3.utils.toWei('0.02','ether')});

    //ahora llamando al player ingresado CALL
    const players =  await lottery.methods.getPlayers().call({from: accounts[0]});
    //al argumento call le ingreso from para que sepa desde que cuenta le
    //me estoy inscribiendo.
    //verificando que ahora solo haya una persona en el array:
    assert.equal(accounts[0],players[0]);
    assert.equal(1,players.length);//el valor que deberia esta y el valor que esta.
  });

  it('Allows multiple account to enter', async ()=>{//esta it corre
    //independiente del otro it.
    await lottery.methods.enter().send(
      {from:accounts[0] , value: web3.utils.toWei('0.02','ether') });

    await lottery.methods.enter().send(
      {from:accounts[1] , value: web3.utils.toWei('0.02','ether') });

    await lottery.methods.enter().send(
      {from:accounts[2] , value: web3.utils.toWei('0.02','ether') });

    const players =  await lottery.methods.getPlayers().call({from: accounts[0]});

    assert.equal(accounts[0],players[0]);
    assert.equal(accounts[1],players[1]);
    assert.equal(accounts[2],players[2]);
    assert.equal(3,players.length);
  });


  /*verificando que solo el manager puede setear el pickWinner*/
/*------------
  it('Only manager can call pickWinner',async()=>{
    try{
      await lottery.methods.pickWinner().send(
        {from:accounts[1]});//elijo otra cuenta que no sea la del manager
      assert(false);
    }catch(err){
  assert(err);
  }

  });

  it('Verificando todo el proceso',async()=>{
    const initialBalance_antes = await web3.eth.getBalance(accounts[0]);
    /*me permite consultar el balance de una cuenta especifica*/
/*-----------
    console.log(initialBalance_antes);//antes del deposito
    await lottery.methods.enter().send(
      {from:accounts[0],value:web3.utils.toWei('2','ether')}
    );
    const initialBalance = await web3.eth.getBalance(accounts[0]);/*
    balance inicial pero despues de haber depositado 2 ethers*/
/*---------------
    await lottery.methods.pickWinner().send(
      {from:accounts[0]});

    const finalBalance = await web3.eth.getBalance(accounts[0]);

    const difference = finalBalance - initialBalance ;
    console.log(initialBalance);//despues del deposito
    console.log(finalBalance);//despues de ganar
    console.log(difference); //lo que gaste en enviar la transaccion
    assert(difference>web3.utils.toWei('1.8','ether'));/*esta diferencia
    deberia ser menor a 1.8 ethers, y en general mayor a cero porque
    hay un gasto de gas que hace que las cantidades de balance inicial y final
    no sean iguales*/
/*-------------

  });

});

-----------*/

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
////////****testing with mocha////////****
/*mocha es usado para testear codigo en javascript
*/
/*class Car{
  //creando dos metodos para Car
  //1.
  park(){
    return 'stopped';
  }
  drive(){
    return 'vroom';
  }
}*/
/*
//usando la funcion describe para agrupar varios tests
//los cuales testearan el mismo objeto
describe('objetodetesteo: Car',()=>{//objeto testeo por ejem. Car
  it('puede parquear',()=>{
    //esta parte es la error funcion
    //aqui escribire la configuracion del testeo y la assertion logic
    //debemos asegurarnos que al llamar a la funcion park, esta nos
    //retorne la string stopped
    const car = new Car();//cerando una instancia para el testeo de Car
    assert.equal(car.park(),'stopped');
    //con este assert estamos verificando (T/F) si la salida del metodo
    //park es 'stopped'.
  });

  it('puede manejar',()=>{
    const car = new Car();
    assert.equal(car.drive(),'vroom');
  });



});
*/

//como se observa que for each it se define la instancia car, entonces
//simplificaremos este codigo con la funcion for each
/*let car;//lo declaro afurea de las funciones para que sea una variable
//global
//se usa let para que la variable pueda ser reasignada cuando
//entre al beforeEach
beforeEach(()=>{//el argumento es la error function
  //ahora toda la logica aqui se ejecutara antes de cada IT de nuestro
  //testeo
  car = new Car();//hare que esto se repita antes de que corra
  //cada it

});

//ahora escribiendo la version simplificada del codigo comentado
describe('objetodetesteo: Car',()=>{
  it('puede parquear',()=>{
    assert.equal(car.park(),'stopped');

  });

  it('puede manejar',()=>{
    assert.equal(car.drive(),'vroom');
  });
*/
