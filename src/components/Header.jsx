import React from "react";
import Logout from "./Logout";

function Header(props) {
  return (
    <header>
          {props.show && <Logout />}
      <h1>{props.name}</h1>
    </header>
  );
}

export default Header;
