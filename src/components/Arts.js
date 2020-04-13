import React, { useEffect, useState } from "react";
import { css } from "@emotion/core";
import "regenerator-runtime/runtime.js";

import ArtPiece from "./ArtPiece";

const Arts = () => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get art
  useEffect(() => {
    async function getArt() {
      setIsLoading(true);
      let pieces = [];
      for (let i = 0; i < 10; i++) {
        const res = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${
            438814 + i
          }`
        );
        const art = await res.json();
        pieces.push({
          id: art.objectID,
          name: art.title,
          date: art.objectDate,
          image: art.primaryImage,
          artist: art.artistDisplayName,
        });
      }
      setArtists(pieces);

      setIsLoading(false);
    }

    getArt();
  }, []);

  if (isLoading) {
    return (
      <main
        css={css`
          padding: 2%;
        `}
      >
        Loading Art...
      </main>
    );
  }
  return (
    <main
      css={css`
        padding: 20px 2.5%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        justify-content: center;
        text-align: center;
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
    </main>
  );
};

export default Arts;
