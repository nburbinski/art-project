import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import { Link } from "@reach/router";

import SearchResult from "./SearchResult";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getArt() {
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`
      );
      const list = await res.json();
      if (!list.objectIDs) return;
      setSearchResults(list.objectIDs.slice(0, 5));
    }

    getArt();
  }, [search]);
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
          flex-direction: column;

          .results {
            max-height: 500px;
            max-width: 200px;
            z-index: 999;
            font-weight: normal;
            justify-content: right;
            text-align: right;
          }

          .search {
            flex-direction: row;

            input {
              background-color: #ededf2;
              padding: 5px 5px;
              border-style: none;
              border-radius: 5px;
            }
          }
        }
      `}
    >
      <Link to="/">
        <h1>ARTSY FARTSY</h1>
      </Link>
      <div>
        <div className="search">
          <div>Search</div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        <div className="results">
          {searchResults.map((result) => (
            <SearchResult key={result} id={result} />
          ))}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
