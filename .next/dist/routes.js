'use strict';

/*se instalo primeramente npm install --save next-routes*/
var routes = require('next-routes')();
/*importando la libreria next-routes
require('next-routes') retorna una funcion, por lo que hay que ponerle un par
de parentesis:  require('next-routes')()
*/
routes.add('/campaigns/new', '/campaigns/new')
/*si intento acceder a '/campaigns/new' entonces en efecto accedere a
'/campaigns/new'*/

.add('/campaigns/:address', '/campaigns/show')
/*address es un nombre cualquiera que le estoy poniendo
":" indica que :address es un wildcard(comodin) que proviene de una fuente
externa, asimismo :addres puede ser cualquier link,
campaigns/show es la pagina a la que en respuesta voy a ser redireccionado
*/
.add('/campaigns/:address/requests', '/campaigns/requests/index').add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
/*module.exports exportara alugnos topicos de ayuda que nos sera util
para navegar automaticamente através de la aplicacion, asimismo nos ayuda a
generar etiquetas de enlaces para tambien mostrarlos dentro de componentes react*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQU0sU0FBVSxBQUFoQjtBQUNBOzs7O0FBSUEsT0FBTyxBQUFQLElBQVcsQUFBWCxrQkFBNEIsQUFBNUI7QUFDQSxBQURBOzs7Q0FJQyxBQUpELElBSUssQUFKTCx1QkFJMkIsQUFKM0I7QUFLQSxBQUxBOzs7OztDQVVDLEFBVkQsSUFVSyxBQVZMLGdDQVVvQyxBQVZwQyw2QkFXQyxBQVhELElBV0ssQUFYTCxvQ0FXd0MsQUFYeEM7O0FBYUEsT0FBTyxBQUFQLFVBQWlCLEFBQWpCO0FBQ0EiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3VzdWFyaW8xL3Byb2plY3RzX3NvbGlkaXR5L2tpY2tzdGFydCJ9