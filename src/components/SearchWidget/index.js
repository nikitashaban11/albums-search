import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";

import { getAlbums } from "../../api";
import { uniqueArrayOfObject } from "../../utils";
import "./style.css";

const initialAlbums = [
  { collectionName: "A", collectionId: 1 },
  { collectionName: "B", collectionId: 2 },
  { collectionName: "C", collectionId: 3 },
  { collectionName: "D", collectionId: 4 },
  { collectionName: "E", collectionId: 5 },
];

const SearchWidget = () => {
  const [albums, setAlbums] = useState(initialAlbums);
  const [searchedAlbums, setSearchedAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const [first, ...rest] = albums;

      if (searchedAlbums.length !== 0) {
        const [firstSearched, ...restSearched] = searchedAlbums;
        const rotatedAlbumsWithSearched = [...rest, firstSearched];

        setSearchedAlbums(restSearched);
        setAlbums(rotatedAlbumsWithSearched);
      } else {
        const rotatedAlbums = [...rest, first];

        setAlbums(rotatedAlbums);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [albums, searchedAlbums, searchedAlbums.length]);

  useEffect(() => {
    if (searchQuery !== "") {
      getAlbums(searchQuery).then((res) => {
        const searchedAlbums = uniqueArrayOfObject(
          res.results,
          "collectionName"
        )
          .sort((a, b) => a.collectionName?.localeCompare(b.collectionName))
          .slice(0, 5);

        setSearchedAlbums(searchedAlbums);
      });
    }
  }, [searchQuery]);

  return (
    <div className="widget">
      <DebounceInput
        value={searchQuery}
        debounceTimeout={500}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul className="widget-list">
        {albums.map((album) => (
          <li key={album.collectionId}>{album.collectionName}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchWidget;
