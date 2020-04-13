import React, { useEffect, useState } from "react";
import { css } from "@emotion/core";
import { Link } from "@reach/router";

const ArtPiece = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    let mounted = true;
    async function getArt() {
      setIsLoading(true);
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
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
  }, []);

  return (
    <Link
      css={css`
        text-decoration: none;
      `}
      to={`/${id}`}
    >
      <div
        css={css`
          background-color: #ededf2;
          color: #000;
          padding-top: 12.5px;
          width: 250px;
          border-radius: 15px;
          text-decoration: none;

          .title {
            font-weight: bold;
            padding: 10px 10px 0px;
          }
          .date {
            font-size: 11px;
            margin-bottom: 15px;
          }

          &:hover {
            cursor: pointer;
          }

          img {
            width: 100%;
          }
        `}
      >
        <div className="title">
          {!details.name
            ? "Name not found"
            : details.name.length > 25
            ? `${details.name.slice(0, 25)}...`
            : details.name}
        </div>
        <div className="date">
          {details.date ? details.date : "Date not found"}
        </div>
        <div>
          {details.more ? <a href={details.more}>Learn more here</a> : ""}
        </div>
        <img
          css={css`
            border-radius: 0px 0px 15px 15px;
          `}
          src={details.image}
          alt={details.name}
          height="300px"
        />
      </div>
    </Link>
  );
};

export default ArtPiece;
