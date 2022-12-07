import { useState, useEffect, useContext } from "react";

import { DateContext } from "../../contexts/date.context";
import { SearchResultsContext } from "../../contexts/searchresults.context";

import SearchExercise from "./searchexercise";
import SearchFoodOptions from "./searchfoods";
import SearchResultsList from "./searchResultsList";
import SearchFoodNutrition from "./makefoodentry";

const DayLog = (props) => {
  const { number } = props;
  const { currentDateStr } = useContext(DateContext);
  const { searchResults, setSearchResults } = useContext(SearchResultsContext);
  const [searchBarsVisible, setSearchBarsVisible] = useState(false);

  const handleClick = () => {
    setSearchBarsVisible(!searchBarsVisible);
    setSearchResults([]);
  };

  return (
    <div>
      <p>{currentDateStr}</p>
      <p onClick={handleClick}>
        {searchBarsVisible ? "Close" : "Open"} search options
      </p>

      {searchBarsVisible && (
        <div>
          <SearchExercise />
          <SearchFoodNutrition />
          <SearchFoodOptions />

          {searchResults ? (
            <SearchResultsList />
          ) : (
            <span>Search results</span>
          )}
        </div>
      )}

      <div>food intake record {number}</div>
    </div>
  );
};
export default DayLog;
