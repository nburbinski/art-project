import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import NavBar from "./components/NavBar";
import Arts from "./components/Arts";
import ArtDetailsPage from "./components/ArtDetailsPage";
import ArtistPage from "./components/ArtistPage";

const App = () => {
  return (
    <div>
      <NavBar />
      <Router>
        <Arts path="/" />
        <ArtDetailsPage path="/art/:id" />
        <ArtistPage path="/artist/:id" />
      </Router>
    </div>
  );
};

render(React.createElement(App), document.getElementById("root"));
