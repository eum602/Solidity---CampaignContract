import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    /*destructuring*/
    const { address } = props.query; /*equivalente a props.query.address*/
    const campaign = await Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    /*array(2).fill() crea un array de dos elementos indefinidos
    Array(2).fill().map((elemento,indice)=>indice*indice) crea [0, 1]
    Array(2).fill().map((elemento,indice)=>indice*indice+2) crea [2, 3]*/
    //console.log(counts);
    const requests = await Promise.all(
      Array(
        parseInt(requestCount)
      ) /*pasando un entero porque eso es lo que espera de
      argumento*/
        .fill()
        .map((elemento, indice) => {
          return campaign.methods.requests(indice).call();
        })
    );
    /*console.log(requests);*/
    return {
      address,
      requests,
      approversCount,
      requestCount
    }; /*<=notacion ES6 ... traciconal =>return {address:address};*/
  }

  renderRow() {
    return this.props.requests.map((request, indice) => {
      return (
        <RequestRow
          request={request}
          id={indice}
          key={indice}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Request List</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: "10px" }}>
              Add request
            </Button>
          </a>
        </Link>
        {/*<Table celled>*/}
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests</div>
      </Layout>
    );
  }
}

export default RequestIndex;
