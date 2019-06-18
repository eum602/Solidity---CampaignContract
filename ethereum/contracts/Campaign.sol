pragma solidity ^0.4.22;
/*Creaindo un contrato factory que me permita crear el contrato Campaign a través
de este contrato*/
contract CampaignFactory{
    /*declaracion de variables*/
    address[] deployedCampaigns;

    /*Creando la funcion que crea una instacia de otro contrato */
    function createCampaign(uint minimum) public {
        /*creando una nueva instancia del contrato Campaign */
        address newCampaign = new Campaign(minimum, msg.sender); /*Los argumentos
        enviados se setean por primera vez en el constructor de la nueva instancia
        de Campaign; se le envia al contrato, el minimo de aporte y
        la direccion de quien quiere crear la campaña, este sera
        el manager en la nueva instancia de Campaign*/
        /*almacenando la direccion de la nueva campaña creada dentro del array
        de campañas creadas*/
        deployedCampaigns.push(newCampaign);
    }

    /*mostrando las direcciones de las nuevas instancias del contrato Campaign
    que ha sido creado*/
    function getDeployedCampaign() public view returns(address[]){
        return deployedCampaigns;
    }
}


/*Mapping:  Caracteristicas:
1.El tiempo de busqueda para hallar un valor es constante
y no depende de un tamaño de array como es el caso de busquedas en arrays

2. keys no son almacenados en mappings, en mappings se suministra un key la
cual pasa por una funcion de hasheo la cual devuelve un indice de un array.luego
con ese indice solidity entra al mapping y recoge el value de dicho index.
Keys are not stored, esto significa que no podemos tener una lista de keys, pero
si se puede acceder a ellos.

3.Los value de los mapping no son iterables, es decir no se puede hacer un loop
a traves del mapping y obtener los valores que este tiene.

4.Todos los valores existen, es decir aun cuando trate de acceder a un valor
mediante un key, que no he definido y por tanto no tiene un valor asociado,
la salida del mapping me devolvera un valor "" en el caso de un string, o me
devolvera un 0 en el caso de que los values hayan sido declarados enteros, en
el caso de que el value sea del tipo bool entonces en caso de que para cierto
par el key, value no haya sido definido entonces devolvera un value false.
*/

contract Campaign{
    /*creando el struct para el definir un struct a que llamare request
    en mi contrato.
    En el caso de un struct no se crea una isntancia de esta
    struct es como un nuevo tipo de variable, en este caso mi nuevo tipo
    de variable se llamara Request*/
    struct Request{
        string description;//descripcion del request
        uint value;//valor que se enviara al supplier
        address recipient;//supplier a quien se destinara los fondos
        bool complete;
        uint approvalCount;//cantidad de votos aprovados
        mapping(address => bool ) approvals;
        /*map de direccion y quienes aprobaron*/
        /*approvals es un reference type y por tanto no se requiere inicializarlo*/
    }
    //declaracion de variables
    Request[] public requests;/*creando un array de elementos
    tipo Request*/
    address public manager;
    uint public minimumContribution;
    /*address[] public approvers; lo reemplazare con un mapping*/
    /*Se definira una variable tipo mapping donde los keys son las addresses
    y los values son boolean, a esta  variable mapping lo llamare approvers*/
    mapping(address => bool ) public approvers;
    uint public approversCount;

    /*modifiers*/
    modifier restricted(){
        require(msg.sender==manager);
        _;
    }

    /*Constructor*/
    //constructor(uint minimum) public {
    constructor(uint minimum,address creator) public {
        //manager = msg.sender;
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute () public payable {/*payable me permite
    verificar que esta funcion sea pagada cuando se llame*/
        require(msg.value > minimumContribution);

        if(!approvers[msg.sender]){
            approversCount++;
        }
        //approvers.push(msg.sender);
        approvers[msg.sender] = true; /*se le asigna al maping en la
        direccion de quien contribuye el value de true, osea que ha contribuido*/
    }

    function createRequest(string description, uint value, address recipient)
        public restricted {
            /*require(approvers[msg.sender]);/*se utiliza el map approvers para
            verificar que el manager tambien haya depositado dinero*/

            /*Una forma de ver el uso de las keywords MEMORY y STORAGE es DONDE
            nuestro contrato almacena datos, en este sentido se hace referencia
            a STORAGE: almacena datos de manera permanente, la cual luego
            puede ser consultada mediante las call function. Por ejemplo
            las variables declaradas en los contratos, los cuales son usados
            de y almacenados permanentemente.
            MEMORY: almacena los datos de manera temporal, por ejemplo los
            argumentos de entrada de una funcion que una vez usados son desechados*/

            /*Otra forma de ver los terminos STORAGE y MEMORY es que son formas
            diferentes de como solidity trabaja con las variables para
            almacenar los valores(datos)
            En este sentido STORAGE es usado cuando utilizo esta keyword para
            apuntar a la direccion en donde esta almacenado el valor de una
            variable. Ejm: uint[] storage myArray = numbers; en este ejemplo
            los cambios que haga sobre la variable array se veran reflejados
            directamente sobre el array numbers
            La segunda keyword en este contexto es MEMORY,
            Ejm: uint[] memory myArray = numbers ... En este ejeplo generico la
            variable myArray es una copia de numbers, pero esta en otra direccion,
            por tanto myArray apunta a otra direccion que no es la direccion de
            numbers, luego al hacer un cambio en la variable myArray dicho cambio
            no se vera reflejado en numbers.
            En el caso de las funciones:
            Ejm
            constructor(){
                numbers = [20 , 12];
                modificador();
            }
            funcion modificador(int[] myArray) public{
                myArray[0] = 1;
            }

            El argumento de la funcion modificador es por default una variable
            de tipo memory, por lo que si llamo a la funcion desde el constructor
            entonces numbers no se vera mdificado.
            Sin embargo si el argumento lo declaro asi:
            function...(int[] storage myArray)...
            entonces al llamar a esta funcion desde e contructor se notara
            que si modifica el valor de la variable almacenada storage numbers.
            */


            /*Request({
                description : description,
                value : value,
                recipient : recipient,
                complete : false
            }) es un VALOR de tipo Request, similar al numero 5 o a la
            palabra herradura o cualquier otro valor.
            newRequest es una variable que por ser temporal la estoy declarando
            como memory*/
            Request memory newRequest=Request({
                /*los value types(string, int, uint, bool, so on)
                si requieren inicializacion*/
                description : description,
                value : value,
                recipient : recipient,
                complete : false,
                approvalCount : 0 /*inicializando el contador de
                votos aprobados en cero*/
                /*approvals[...] no requiere inicializacion*/
            });
            /*otra forma de declarar
            newRequest(description,value,recipient,false)
            se deben ingresar los argumentos en el orden en que el
            struct ha sido creado*/
            requests.push(newRequest);
    }

    function approveRequest(uint index) public {

        Request storage request  = requests[index]; /*apuntando a la variable
        struct requests[index] donde indice indica el numero de request*/

        require(approvers[msg.sender]);/*verificando que este participante haya
        depositado*/
        require(!request.approvals[msg.sender]);/*verificando que para determinado
        request, el participante no haya votado anteriormente*/

        request.approvalCount ++;/*adicionando el voto del participante al contador
        global de votos*/
        request.approvals[msg.sender]=true; /*como ya voto ahora si sellando su voto
        en el map approvals de este request*/
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        request.recipient.transfer(request.value);/*se transfiere el dinero
        a la direccion que se encuentra en la direccion del struct requests[index].value*/
        request.complete = true;

    }

    function getSummary() public view returns(uint , uint, uint, uint, address){
        return (
            minimumContribution,
            //this.balance,
            address(this).balance,
            requests.length,
            approversCount,
            manager
            );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}