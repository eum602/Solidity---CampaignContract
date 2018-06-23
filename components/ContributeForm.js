import React, { Component } from "react";
import { Input, Message, Form, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign.js";
import web3 from "../ethereum/web3";
import {Router} from "../routes";

class ContributeForm extends Component {
  state = {
    loading: "",
    errorMessage: "",
    value: ""
  };

  onSubmit = async event => {
    /*pasando el objeto event*/
    event.preventDefault();
    const campaign = Campaign(
      this.props.address
    ); /*tengo acceso a la propiedad
    address que viene desde otro archivo que en mi caso es desde el archivo show.js*/
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
      Router.replace(`/campaigns/${this.props.address}`);/*en este caso uso
      la propiedad replace para que se reemplace la pagina actual con la misma
      pero actualizada, osea se renderiza nuevamente.
      Si le pusiera pushRoute entonces se crearia un registro en el webbrowser de
      la misma pagina lo que no quiero, puesto que no quiero que al hacer atras
      me devuelva al mismo sitio donde estoy*/
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form        
        onSubmit={this.onSubmit}
        error={!!this.state.errorMessage}
      >
        <Form.Field>
          <label>Contribute to this campaign</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>
        <Message
          error
          header="There was an error"
          content={this.state.errorMessage}
        />
        <Button primary loading={!!this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}
export default ContributeForm;
