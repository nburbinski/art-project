import React from "react";
import { render } from "react-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
    </div>
  );
};

render(React.createElement(App), document.getElementById("root"));
