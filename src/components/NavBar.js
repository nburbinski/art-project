import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import { Link } from "@reach/router";

import { colors } from "../colors";
import SearchResult from "./SearchResult";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
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
        background-color: ${colors.background};
        padding: 10px 3%;
        box-shadow: rgba(31, 53, 78, 0.11) 0 1px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
          text-decoration: none;
          color: ${colors.primary};
        }
        h1 {
          font-size: 25px;
        }

        div {
          font-size: 15px;
          align-items: center;
          display: flex;
          flex-direction: column;
          position: relative;

          .results {
            display: ${inputFocused ? "inherit" : "none"};
            position: absolute;
            top: 37.5px;
            background-color: ${colors.secondary};
            max-height: 500px;
            font-weight: normal;
            text-align: start;
            width: 95%;
            border-radius: 0px 0px 5px 5px;
            padding: 5px;
          }

          .result {
            text-align: start;
          }
          .result:hover {
            opacity: 50%;
          }

          .search {
            flex-direction: row;

            input {
              background-color: ${colors.secondary};
              padding: 10px 10px;
              border-style: none;
              border-radius: 5px;
            }
          }
        }
      `}
    >
      <Link to="/">
        <h1>ARTSY PROJECT</h1>
      </Link>
      <div>
        <div className="search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setTimeout(() => setInputFocused(false), 500)}
            placeholder="Search..."
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
