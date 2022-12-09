import { useEffect, useState } from "react";
import uniqid from "uniqid";

import { getFoodAutoFillOptions } from "./searchfunctions/foodsearch";

import { Label } from "./input.styles";
import { Input } from "../input/input.styles";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button";

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
      <Label htmlFor="search-foods">Looking for something specific?</Label>
      <Input
        type="text"
        name="search-foods"
        onChange={handleChange}
        placeholder="2 red bell peppers, 3 eggs"
        value={searchQuery}
      />
      <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Search</Button>
      
    </form>
  );
};

export default SearchFoodOptions;
