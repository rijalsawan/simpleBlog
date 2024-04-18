import React from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const handleSearchChange = (e) => {
    if (e.target.name === "search") setQuery(e.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const url = `https://real-time-web-search.p.rapidapi.com/search?q=${query}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c1463f3b44msh69f2ba005b9bb8bp1ecf21jsn2d3cc5d14a4b",
        "X-RapidAPI-Host": "real-time-web-search.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setResults(result.data);
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex justify-center mt-[5rem] gap-3 max-sm:mx-5">
        <input
          onChange={handleSearchChange}
          type="text"
          name="search"
          value={query}
          className="border border-black rounded-lg w-[30rem]"
          placeholder="search anything"
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
        {results.length > 0 && (
          <div className="absolute bg-white z-10 mt-[5rem] max-sm:w-[21rem]">
            {" "}
            {results.map((result, index) => (
              <a  key={index} target="_blank"  href={result.url}><div className="border my-2 rounded  border-black p-2">
                {result.title}{" "}
                <p className="text-xs">{result.url}</p>
                <p>{result.description}</p>{" "}
              </div></a>
            ))}{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
