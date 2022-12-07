import { useContext } from "react";
import uniqid from "uniqid";

import { SearchResultsContext } from "../../contexts/searchresults.context";
import { getExerciseDataFromSearchResults } from "./searchfunctions/parseexercisedata";
import { getFoodNutritionDataFromSearchResults } from "./searchfunctions/parsefooddata";

const SearchResultsList = () => {
  const { searchResults, searchType } = useContext(SearchResultsContext);
  let resultsList;
  let optionsListItems = null;

  if (searchResults.length > 0) {
    if (searchType === "exercise") {
      resultsList = getExerciseDataFromSearchResults(searchResults);
      optionsListItems = resultsList.map((result) => {
        const { title, quantity, calories, otherData } = result;
        return (
          <li key={uniqid()} data={otherData}>
            {Math.round(quantity)} minutes {title}, {Math.round(calories)}{" "}
            calories
            <button>Add</button>
          </li>
        );
      });
    } else if (searchType === "nutrition") {
      resultsList = getFoodNutritionDataFromSearchResults(searchResults);
      optionsListItems = resultsList.map((result) => {
        const { title, quantity, weight, calories, nutrition } = result;
        return (
          <li key={uniqid()} data={nutrition}>
            {quantity} {title} ({weight}g), {calories} calories
            <button>Add</button>
          </li>
        );
      });
    } else if (searchType === "food") {
    }
    return (
      <ul className="search-results">
        {resultsList && searchResults && optionsListItems}
      </ul>
    );
  }
};
export default SearchResultsList;
