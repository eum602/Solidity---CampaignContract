import React, { Component } from "react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory.js";
import Campaign from "../../ethereum/campaign.js"; /*le estoy poniendo mayusculas
para notar que es una funcion que creara una nueva instancia, y no porque sea
un contructor o una clase*/
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes.js";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    /*esta funcion sera llamada con una de
    sus propias propiedades*/
    /*console.log(props.query.address);query es una de las propiedades del objeto props
    lo que basicamente se hace es obtener la direccion que esta en la query
    el nombre "address" es asi llamado porque si me voy al archivo routes yo llamé
    asi a la propiedad : routes.add('/campaigns/:address','/campaigns/show');
    de modo que en esta pagina se tomara la la query del bar del browser y en ella
     se tomara la propiedad address, que dicho sea de paso pudo tener otro nombre,
    pero como repito lo definí asi en routes.js*/
    const campaign = await Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    /*console.log(summary);
    el resultado no es un array sino un objeto
    Result {
  '0': '100',
  '1': '0',
  '2': '0',
  '3': '0',
  '4': '0x1e8457e7d82203dba5c5804080D16494368Ea4C1' }
*/

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }; /*siempre debe ir un return dentro de getInitialProps*/
  }
  /*creando un metodo para renderizar los cards*/
  renderCards() {
    /*destructurando*/
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager
    } = this.props; //this.props.summary;

    const items = [
      {
        header: manager,
        description:
          "The manager created this campaign and can create requests to withdraw money",
        meta: "Address of manager",
        style: {
          overflowWrap: "break-word"
        } /*hace que todo quede encapsulado y
        no se salga del card*/
      },
      {
        header: minimumContribution,
        description: "Minimum Contribution(wei)",
        meta:
          "You must contribute at least this much wei to become an approver",
        style: {
          overflowWrap: "break-word"
        } /*hace que todo quede encapsulado y
        no se salga del card*/
      },
      {
        header: requestsCount,
        description:
          "A request tries to withdraw money from the contract. Request must be approved by approvers",
        meta: "Number of requests",
        style: {
          overflowWrap: "break-word"
        } /*hace que todo quede encapsulado y
        no se salga del card*/
      },
      {
        header: approversCount,
        description:
          "Number of people  who have already donated to this campaign",
        meta: "Number of approvers",
        style: {
          overflowWrap: "break-word"
        } /*hace que todo quede encapsulado y
        no se salga del card*/
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        description:
          "The balance is how much money  this campaign  has left  to spend.",
        meta: "Campaign balance (ether)",
        style: {
          overflowWrap: "break-word"
        } /*hace que todo quede encapsulado y
        no se salga del card*/
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      /*<div> se usa para varias lineas de codigo*/
      <Layout>
        <h3>Show Campaign</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row> {/*creo otra fila debajo*/}
            <Grid.Column> {/*creo una columna para que se mantenga la indentacion*/}
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
