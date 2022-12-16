import { useState, useEffect, useContext } from "react";

import { DateContext } from "../../contexts/date.context";
import { SearchResultsContext } from "../../contexts/searchresults.context";
import { LoggedDataContext } from "../../contexts/loggeddata.context";

import SearchExercise from "./searchexercise";
import SearchResultsList from "./searchResultsList";
import SearchFoodNutrition from "./makefoodentry";
import SavedResultsDisplay from "./savedresultsdisplay";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import { Input } from "../input/input.styles";
import { ClickableP } from "../styles/clickable.styles";
import "./daylog.styles.css";

const DayLog = (props) => {
  const { id, date } = props;
  const { searchResults, setSearchResults } = useContext(SearchResultsContext);
  const { deleteExistingEntry, entryList } = useContext(LoggedDataContext);

  const [entryDate, setEntryDate] = useState(date);
  const [searchBarsVisible, setSearchBarsVisible] = useState(false);

  const thisDayEntry = entryList.find((entry) => entry.id === id);
  const totalCalBurn = Math.round(
    thisDayEntry.exercise
      .map((entry) => entry.calories)
      .reduce((acc, current) => acc + current, 0)
  );
  const totalCalIntake = Math.round(
    thisDayEntry.food
      .map((entry) => entry.calories)
      .reduce((acc, current) => acc + current, 0)
  );
  const totalCarbIntake = Math.round(
    thisDayEntry.food
      .map((entry) => entry.nutrition.carbohydrates)
      .reduce((acc, current) => acc + current, 0)
  );
  const totalFatIntake = Math.round(
    thisDayEntry.food
      .map((entry) => entry.nutrition.fat)
      .reduce((acc, current) => acc + current, 0)
  );
  const totalProteinIntake = Math.round(
    thisDayEntry.food
      .map((entry) => entry.nutrition.protein)
      .reduce((acc, current) => acc + current, 0)
  );

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
    <div className="daylog">
      <div className="day-totals">
        <div className="totals-heading">
          <h3>Totals for </h3>
          <Input
            type="date"
            name="entrydate"
            id="entrydate"
            value={entryDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="calories">
          <h4>Calories </h4>
          <p>Out: {totalCalBurn} cal</p>
          <p>In: {totalCalIntake} cal</p>
        </div>
        <div className="macros">
          <h4>Macros</h4>
          <p>Protein: {totalProteinIntake}g </p>
          <p>Fats: {totalFatIntake}g </p>
          <p>Carbohydrates: {totalCarbIntake}g </p>
        </div>
      </div>
      <ClickableP onClick={handleExpandSearchClick}>
        {searchBarsVisible ? "Close" : "Open "} search options{" "}
        {searchBarsVisible ? "  - " : " +"}
      </ClickableP>

      {searchBarsVisible && (
        <div className="search-container">
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

      <div className="results-display">
        <SavedResultsDisplay title="Food intake" searchType="food" logId={id} />
        <SavedResultsDisplay
          title="Exercise"
          searchType="exercise"
          logId={id}
        />
      </div>

      <Button
        buttonType={BUTTON_TYPE_CLASSES.delete}
        onClick={handleDelete}
        id="delete-record-button"
      >
        Delete this record
      </Button>
    </div>
  );
};
export default DayLog;
