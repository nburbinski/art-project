import React from "react";
import { css } from "@emotion/core";
import { Link } from "@reach/router";

const ArtPiece = ({ name, date, more, image, artist, id }) => {
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
          text-align: center;
          width: 250px;
          border-radius: 15px;
          margin: 35px auto;
          text-decoration: none;

          .title {
            font-weight: bold;
            padding: 10px 10px 0px;
          }
          .date {
            font-size: 11px;
          }

          .artist {
            margin-bottom: 15px;
            font-size: 15px;
          }
          &:hover {
            cursor: pointer;
          }
        `}
      >
        <div className="title">
          {!name
            ? "Name not found"
            : name.length > 25
            ? `${name.slice(0, 25)}...`
            : name}
        </div>
        <div className="date">{date ? date : "Date not found"}</div>
        <div className="artist">By {artist}</div>
        <div>{more ? <a href={more}>Learn more here</a> : ""}</div>
        <img
          css={css`
            border-radius: 0px 0px 15px 15px;
          `}
          src={image}
          alt={name}
          width="250"
          height="275"
        />
      </div>
    </Link>
  );
};

export default ArtPiece;
