import React, { useState } from "react";
import { css } from "@emotion/core";
import { Link } from "@reach/router";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <header
      css={css`
        background-color: #fff;
        padding: 10px 3%;
        box-shadow: rgba(31, 53, 78, 0.11) 0 1px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
          text-decoration: none;
          color: #000;
        }
        h1 {
          font-size: 25px;
        }

        div {
          font-size: 15px;
          align-items: center;
          display: flex;
          margin-right: 5px;
          input {
            background-color: #ededf2;
            padding: 5px 5px;
            border-style: none;
            border-radius: 5px;
          }
        }
      `}
    >
      <Link to="/">
        <h1>ARTSY FARTSY</h1>
      </Link>
      <div>
        <div>Search</div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
    </header>
  );
};

export default NavBar;
