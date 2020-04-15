import React, { useEffect, useState } from "react";
import { css } from "@emotion/core";
import "regenerator-runtime/runtime.js";

import ArtPiece from "./ArtPiece";
import { colors } from "../colors";

const Arts = () => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  // Get art
  useEffect(() => {
    let mounted = true;

    async function getArt() {
      let pieces = [];
      for (let i = 0; i < 10; i++) {
        const res = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${Math.floor(
            Math.random() * 80000
          )}`
        );
        const art = await res.json();
        if (!art.primaryImage) {
          i -= 1;
          continue;
        }

        pieces.push({
          id: art.objectID,
          name: art.title,
          date: art.objectDate,
          image: art.primaryImage,
          artist: art.artistDisplayName,
        });
      }
      if (mounted) {
        setArtists(artists.concat(pieces));
        setIsLoading(false);
        setLoadMore(false);
      }
    }

    getArt();
    return () => (mounted = false);
  }, [loadMore]);

  if (isLoading) {
    return (
      <main
        css={css`
          padding: 2%;
          box-sizing: border-box;
        `}
      >
        Searching for Random Art...
      </main>
    );
  }
  return (
    <main
      css={css`
        padding: 1%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;

        .more-art {
          text-align: center;
          justify-content: flex-end;
          text-decoration: none;
          align-items: center;
          flex: 0 0 100%;
          margin-bottom: 1%;
          margin-top: 1%;

          div {
            margin-bottom: 5px;
          }

          button {
            margin-top: 15px;
            display: inline-block;
            border: none;
            padding: 1rem 2rem;
            margin: 0;
            text-decoration: none;
            color: ${colors.primary};
            font-size: 1rem;
            cursor: pointer;
            text-align: center;
            transition: background 250ms ease-in-out, transform 150ms ease;
            -webkit-appearance: none;
            -moz-appearance: none;
            border-radius: 5px;
          }
        }
      `}
    >
      {artists.map((artist) => (
        <ArtPiece
          key={artist.id}
          id={artist.id}
          name={artist.name}
          date={artist.date}
          more={artist.more}
          image={artist.image}
          artist={artist.artist}
        />
      ))}
      <div className="more-art">
        {loadMore ? <div> Searching for Random Art...</div> : ""}
        <button onClick={() => setLoadMore(true)}>Load more...</button>
      </div>
    </main>
  );
};

export default Arts;
