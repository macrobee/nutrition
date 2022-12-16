import { useState, useContext } from "react";

import { getNutrientData } from "./searchfunctions/fooditemsearch";
import { getFoodNutritionDataFromSearchResults } from "./searchfunctions/parsefooddata";

import { Label } from "./input.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import { Input } from "../input/input.styles";

import { SearchResultsContext} from "../../contexts/searchresults.context";

const defaultSearchQuery = "";

const SearchFoodNutrition = () => {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const { setSearchResults, setSearchType, searchTypes } = useContext(SearchResultsContext);

  const retrieveNutrientData = async () => {
    const results = await getNutrientData(searchQuery);
    await setSearchType(searchTypes.foodNutrition);
    const parsedResults = getFoodNutritionDataFromSearchResults(results);
    await setSearchResults(parsedResults);
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
    <form onSubmit={handleSubmit} className="search-form">
      <Label htmlFor="search-food">Search foods</Label>
      <div className="input-and-button">
        <Input
          type="text"
          name="search-food"
          onChange={handleChange}
          placeholder="2 red bell peppers, 3 eggs"
          value={searchQuery}
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Search</Button>
      </div>
    </form>
  );
};

export default SearchFoodNutrition;
