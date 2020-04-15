import React, { useEffect, useState } from "react";
import { css } from "@emotion/core";
import { Link } from "@reach/router";
import ArtPieceMore from "./ArtPieceMore";

const ArtDetailsPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [more, setMore] = useState([]);

  // Get details
  useEffect(() => {
    let mounted = true;
    async function getArt() {
      setIsLoading(true);
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.id}`
      );
      const art = await res.json();
      if (mounted) {
        setDetails({
          id: art.objectID,
          name: art.title,
          date: art.objectDate,
          image: art.primaryImage,
          artist: art.artistDisplayName,
          department: art.department,
        });
        setIsLoading(false);
      }
    }

    getArt();
    return () => (mounted = false);
  }, [props.id]);

  useEffect(() => {
    let mounted = true;
    async function getArt() {
      setIsMoreLoading(true);
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${details.artist}
        `
      );
      const list = await res.json();
      if (mounted) {
        if (!list.objectIDs) {
          setIsMoreLoading(false);
          return () => (mounted = false);
        }
        setMore(list.objectIDs.slice(0, 5));
        setIsMoreLoading(false);
      }
    }

    getArt();
    return () => (mounted = false);
  }, [details]);

  if (isLoading) {
    return (
      <div
        css={css`
          padding: 2%;
        `}
      >
        Currently loading...
      </div>
    );
  }
  return (
    <main
      css={css`
        text-align: center;
        margin: auto;
        padding: 2.5%;

        h1 {
          font-size: 2em;
          margin-bottom: 5px;
        }

        p {
          margin-top: 0;
        }
        img {
          width: 75%;
        }

        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding-left: 0;
          li {
            list-style: none;
            margin-bottom: 15px;
            margin-right: 2.5%;
          }
        }

        h3 {
          text-align: start;
        }

        a {
          text-decoration: none;
          color: #000;
        }
      `}
    >
      <h1> {details.name}</h1>
      <p>By {details.artist}</p>
      <img src={details.image}></img>

      <Link to={`/artist/${details.artist}`}>
        <h3>More by this artist</h3>
      </Link>
      <ul>
        {more ? "" : "none found..."}
        {more.map((art) => (
          <li key={art}>
            <ArtPieceMore id={art} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ArtDetailsPage;
