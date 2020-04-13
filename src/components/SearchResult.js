import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

const SearchResult = ({ id }) => {
  const [result, setResult] = useState({});
  useEffect(() => {
    let mounted = true;

    async function getArt() {
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      const art = await res.json();
      if (mounted) {
        setResult({
          name: art.title,
          artist: art.artistDisplayName,
        });
      }
    }

    getArt();
    return () => (mounted = false);
  }, []);
  return (
    <Link to={`/${id}`}>
      <div>
        {!result.name
          ? ""
          : result.name.length > 25
          ? `${result.name.slice(0, 25)}...`
          : result.name}
      </div>
    </Link>
  );
};

export default SearchResult;
