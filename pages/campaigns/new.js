import React, { Component } from "react";
import Layout from "../../components/Layout.js";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory.js"; /*factory con minusculas porque
es una instancia del contrato CampaignFactory*/
import web3 from "../../ethereum/web3.js";
/*import {Link , Router} from '../../routes.js';El componente de React llamado
Link permite renderizar anchor tags dentro de los componetes de react y navegar dentro
de la aplicacion de react
El componente Router de React permite navegar automaticamente de una pagina a otra
Router ayudara a navegar automaticamente a otra pagina despues de crear una campaña,  */
import {Router} from '../../routes.js';

class CampaignNew extends Component {
  /*constructor*/
  state = {
    minimunContribution: "",
    errorMessage: "",
    loading: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({loading:true, errorMessage:""}); /*limpio el error message si es que
    tenia algun contenido*/
    try {
      const accounts = await web3.eth.getAccounts();
      //console.log(accounts);
      await factory.methods
        .createCampaign(this.state.minimunContribution)
        .send({
          from: accounts[0]
        });
        /*redireccionando a la pagina index con la ayuda del componente Router*/
        Router.pushRoute('/');/*con / lo redirecciono a la pagina index donde vere
        todas las campañas existentes*/
    } catch (err) {
      this.setState({ errorMessage: err.message });/*jalando a la propiedad de tipo
      string del objeto error que se genera cuando el try no sale bien, y asignando
      este mensaje a la variable de estado de la clase CampaignNew*/
    }
    this.setState({loading:false});
  };

  render() {
    return (
      /*onSubmit va sin parentesis porque de esta manera se ejecuta en
      algun tiempo en el futuro cuando se presente el evento onSubmit. Si le pongo
      parentesis entonces se ejecutara ahora mismo
      this.state.errorMessage es inicializado vacio osea falsy, en el form al ponerle
      !this.state.errorMessage lo convierto en el opuesto pero en bool y al ponerle
      !!this.state.errorMessage entonces lo regreso a su valor original en bool.
      Se hace esto porque error en Form requiere que el valor sea un bool*/
      <Layout>
        <h3>Create a campaign</h3>
        <Form onSubmit={this.onSubmit} error = {!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimunContribution}
              onChange={event =>
                this.setState({ minimunContribution: event.target.value })
              }
            />
            {/*<input />
               {/*event es un objeto que permite referirme al evento onChange*
               y que contiene el valor el cual sera actualizado despues/}*/}
          </Form.Field>
          <Message error header = "Hubo un error" content = {this.state.errorMessage}/>
          <Button loading={!!this.state.loading} primary >Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
