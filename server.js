const {createServer} = require('http');
const next = require('next');

/*creandoun nueva instancia de la aplicacion*/
const app = next({
  /*pasando la conficuracion del objeto aqui*/
  dev: process.env.NODE_ENV !=='production'
  /*especificacndo si estamos corriendo nuestro servidor en modo produccion
  o en modo desarrollo
  le asigno a la variable global NODE_ENV que no sea en modo produccion, porque si
  asi lo fuera el comportamiento de next seria distinto
  */
});

/*poniendo la logica de navegacion requerida*/
const routes =  require('./routes');
const handler = routes.getRequestHandler(app);
/*se le paso el objeto object*/

app.prepare().then(()=>{
  createServer(handler).listen(3000, err=>{
    if (err) throw err;
    console.log('Ready on localhost:3000');
  });
  /*pasandole el handler que acabo de crear, y diciendole que escuche en el puerto
  3000, asimismo si ocurre un error que haga...*/

  /*finalmente ir al package json y modificar el dev asi: "dev": "node server.js"  */
});
