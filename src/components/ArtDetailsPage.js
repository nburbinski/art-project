import React, { useEffect, useState } from "react";
import { css } from "@emotion/core";
import ArtPieceMore from "./ArtPieceMore";

const ArtDetailsPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [more, setMore] = useState([]);

  // Get details
  useEffect(() => {
    async function getArt() {
      setIsLoading(true);
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.id}`
      );
      const art = await res.json();
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

    getArt();
  }, [props.id]);

  useEffect(() => {
    async function getArt() {
      setIsMoreLoading(true);
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${details.artist}
        `
      );
      const list = await res.json();
      setMore(list.objectIDs.slice(0, 5));
      setIsMoreLoading(false);
    }

    getArt();
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
          width: 50%;
        }

        ul {
          display: flex;
          padding-left: 0;
          justify-content: space-between;
          li {
            list-style: none;
          }
        }

        h3 {
          text-align: start;
        }
      `}
    >
      <h1> {details.name}</h1>
      <p>By {details.artist}</p>
      <img src={details.image}></img>

      <h3>More by this artist</h3>
      <ul>
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
