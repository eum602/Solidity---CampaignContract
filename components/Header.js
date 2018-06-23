import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes.js"; /*se pone las llaves porque se jalara un objeto desde
routes
Asimismo usare Link para crear anchor tags*/

/*{{marginTop : "10px"}}
la llave esterna indica que se trabaja con codigojavascript
la segunda llave es el objeto en si.
marginTop es el margen que se da entre la parte superior y el objeto que lo llama,
que en este caso es menu.
*/

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      {/*<Menu.Item>CrowdCoin</Menu.Item>*/}
      <Link route="/">
        <a className="item">CrowdCoin</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
