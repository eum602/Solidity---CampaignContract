import React, { Component } from "react";
import factory from "../ethereum/factory.js";
import {
  Card,
  Button
} from "semantic-ui-react"; /*https://react.semantic-ui.com/views/card#types-group-props*/
/*https://react.semantic-ui.com/elements/button#types-labeled-icon-shorthand*/
/*import 'semantic-ui-css/semantic.min.css';nextjs no tiene soporte para css
por eso esta linea de codigo no tiene soporte*/
import Layout from "../components/Layout.js";
import { Link } from "../routes.js";

class CampaignIndex extends Component {
  /*Component es la clase
  base de la libreria react */

  static async getInitialProps() {
    /*se inicializan las propiedades desde una fuente externa
    es como si fuera mi constructor*/
    /*asunc porque usare eventos asincronos*/
    /*static define una funcion de clase que no esta asociada ninguna instancia
    que se pueda crear a partir de la clase CampaignIndex
    ejm: const campaignIndex = new CampaignIndex;
         campaignIndex.reder();
    Ahora si quisiera llamar a getInitialProps entonces no necesitaria crear
    una instancia de la clase CampaignIndex, sino lo llamaria directamente asi:
          CampaignIndex.getInitialProps();
    Entonces cuando corra esta funcion no necesitare renderizar, recordar que renderizar es un
    proceso computacionalmente caro. De esta manera hago que mi proceso de llamada inicial
    de datos sea mas eficiente, ese es el motivo por el cual se usara la keyword static.
    */
    const campaigns = await factory.methods
      .getDeployedCampaign()
      .call(); /*obtiene todas las
    direcciones de campañas creadas*/
    //return {campaigns : campaigns}
    return { campaigns };
    //console.log(campaigns);
  }

  /*implementando la funcion renderCampaigns*/
  renderCampaigns = () => {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description:(
          <Link route = {`/campaigns/${address}`}>
          <a>View campaign</a>
          </Link> ), /*los parentesis son opcionales*/
        fluid: true /*hace que el texto este contenido en un marco de extremo a
        extremo de su container*/
      };
    });

    return (
      <Card.Group items={items} />
    ); /*lo que se esta haciendo
    es crear las cards con los objetos que acabo de definir en la contante
    items*/
  };

  /*el render tiene que tener alguna salida de algo de jsx y tiene
 que ir obligatoriamente cada vez que se ejecute una llamada o algun cambio*/
  /*  en icon: "add" o "add circle"*/
  /*primary le da el estilo con color azul al boton*/
  render() {
    return (
      <Layout>
        <div>
          {/*{this.props.campaigns[0]}*/}
          <h3>Open Campaigns</h3>
          {/*poniendo un boton a la DERECHA
            labelPosition coloca el icono en la posicion indicada dentro del button
            floated coloca el boton a la DERECHA o a la izquierda de la PANTALLA*/}
          <Link route="/campaigns/new">
            <a>
              {" "}
              {/*el anchor tag permite que haya el click derecho open in new tab;
              de otra manera sí se podria accedr clickeando debido al componente Link
              pero no habri el click derecho*/}
              <Button
                content="Create Campaign"
                icon="add circle"
                labelPosition="left"
                floated="right"
                primary
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

/*
export default() => {
  return <h1>This is the new campaign page!</h1>;
}
*/
export default CampaignIndex;
