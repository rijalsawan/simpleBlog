import React from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setResults(result.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-black rounded-full"></div>
        </div>
      )}

      <div className="max-w-2xl mx-auto pt-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-black mb-2">Search</h1>
        </div>

        <div className="relative mb-12">
          <div className="flex items-center border-b border-gray-200 pb-2">
            <input
              onChange={handleSearchChange}
              type="text"
              name="search"
              value={query}
              className="flex-1 text-lg outline-none placeholder-gray-400"
              placeholder="Search anything..."
            />
            <button
              onClick={handleSearch}
              className="ml-4 p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
              <FaSearch className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-8">
            {results.map((result, index) => (
              <a
                key={index}
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <h3 className="text-lg font-medium text-black group-hover:text-blue-600 mb-1 transition-colors duration-200">
                  {result.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{result.url}</p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {result.description}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
