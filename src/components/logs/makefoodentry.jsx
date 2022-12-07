import { useState, useContext } from "react";

import { getNutrientData } from "./searchfunctions/fooditemsearch";
import { SearchLabel, SearchInput, SearchButton } from "./input.styles";

import { SearchResultsContext} from "../../contexts/searchresults.context";

const defaultSearchQuery = "";

const SearchFoodNutrition = () => {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const { setSearchResults, setSearchType, searchTypes } = useContext(SearchResultsContext);

  const retrieveNutrientData = async () => {
    const results = await getNutrientData(searchQuery);
    await setSearchType(searchTypes.foodNutrition);

    await setSearchResults(results);
  };

  const handleChange = (e) => {
    const queryString = e.target.value;
    setSearchQuery(queryString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResults([]);
    retrieveNutrientData();
    setSearchQuery(defaultSearchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchLabel htmlFor="search-food">Search foods</SearchLabel>
      <SearchInput
        type="text"
        name="search-food"
        onChange={handleChange}
        placeholder="2 red bell peppers, 3 eggs"
        value={searchQuery}
      />
      <SearchButton type="submit">Search</SearchButton>
    </form>
  );
};

export default SearchFoodNutrition;
