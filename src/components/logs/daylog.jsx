import { useState, useEffect, useContext } from "react";

import { DateContext } from "../../contexts/date.context";
import { SearchResultsContext } from "../../contexts/searchresults.context";
import { LoggedDataContext } from "../../contexts/loggeddata.context";

import SearchExercise from "./searchexercise";
import SearchFoodOptions from "./searchfoods";
import SearchResultsList from "./searchResultsList";
import SearchFoodNutrition from "./makefoodentry";
import SavedResultsDisplay from "./savedresultsdisplay";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import { Input } from "../input/input.styles";

const DayLog = (props) => {
  const { id, date } = props;
  const { searchResults, setSearchResults } = useContext(SearchResultsContext);
  const { deleteExistingEntry } = useContext(LoggedDataContext);

  const [entryDate, setEntryDate] = useState(date);
  const [searchBarsVisible, setSearchBarsVisible] = useState(false);

  const handleDateChange = (e) => {
    setEntryDate(e.target.value);
  };

  const handleDelete = () => {
    deleteExistingEntry({ id }); //modify to take the whole data object later
  };

  const handleExpandSearchClick = () => {
    setSearchBarsVisible(!searchBarsVisible);
    setSearchResults([]);
  };

  return (
    <div>
      <Input
        type="date"
        name="entrydate"
        id="entrydate"
        value={entryDate}
        onChange={handleDateChange}
      />
      <p onClick={handleExpandSearchClick}>
        {searchBarsVisible ? "Close" : "Open"} search options
      </p>

      {searchBarsVisible && (
        <div>
          <SearchExercise />
          <SearchFoodNutrition />
          {/* <SearchFoodOptions /> */}

          {searchResults ? (
            <SearchResultsList logId={id} />
          ) : (
            <span>Search results</span>
          )}
        </div>
      )}

      <SavedResultsDisplay title="Food intake" searchType="food" logId={id} />
      <SavedResultsDisplay title="Exercise" searchType="exercise" logId={id} />

      <Button buttonType={BUTTON_TYPE_CLASSES.delete} onClick={handleDelete}>
        Delete this record
      </Button>
    </div>
  );
};
export default DayLog;
