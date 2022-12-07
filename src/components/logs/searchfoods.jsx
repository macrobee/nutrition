import { useEffect, useState } from "react";
import uniqid from "uniqid";

import { getFoodAutoFillOptions } from "./searchfunctions/foodsearch";

import { SearchInput, SearchButton, SearchLabel } from "./input.styles";

const defaultSearchQuery = "";

const SearchFoodOptions = () => {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const [searchResults, setSearchResults] = useState("");

  //sets debouncing for autofill options
  useEffect(() => {
    const getData = setTimeout(() => {
      getFoodAutoFillOptions(searchQuery);
    }, 1000);
    return () => clearTimeout(getData);
  }, [searchQuery]);

  const handleChange = (e) => {
    const queryString = e.target.value;
    setSearchQuery(queryString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResults(getFoodAutoFillOptions(searchQuery));
    console.log(searchResults);
    setSearchQuery(defaultSearchQuery);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <SearchLabel htmlFor="search-foods">Looking for something specific?</SearchLabel>
      <SearchInput
        type="text"
        name="search-foods"
        onChange={handleChange}
        placeholder="2 red bell peppers, 3 eggs"
        value={searchQuery}
      />
      <SearchButton type="submit">Search</SearchButton>
      
    </form>
  );
};

export default SearchFoodOptions;
