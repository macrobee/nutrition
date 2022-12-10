import { useContext, useState } from "react";
import uniqid from "uniqid";

import { LoggedDataContext } from "../../contexts/loggeddata.context";
import { SearchResultsContext } from "../../contexts/searchresults.context";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";

const SearchResultsList = (props) => {
  const { searchResults, searchType } = useContext(SearchResultsContext);
  const { entryList, editExistingEntry, addDataToEntry } =
    useContext(LoggedDataContext);

  const { logId } = props;
  let optionsListItems = null;

  const handleAddButtonClick = (e) => {
    const title = e.currentTarget.getAttribute("title"); //name of thing to add

    const searchResultData = searchResults.find(
      (result) => result.title === title
    );
    // get data from search (newData)

    const currentEntry = entryList.find((entry) => entry.id === logId);
    // get current entry in entryList (entryToModify)

    const newData = [...currentEntry[searchType], searchResultData];
    //create array containing old and new data

    addDataToEntry(currentEntry, searchType, newData);
  };

  if (searchResults.length > 0) {
    switch (searchType) {
      case "exercise":
        // resultsList = getExerciseDataFromSearchResults(searchResults);
        // console.log(resultsList);
        optionsListItems = searchResults.map((result) => {
          const { title, quantity, calories } = result;
          return (
            <li key={uniqid()}>
              {Math.round(quantity)} minutes {title}, {Math.round(calories)}{" "}
              calories
              <Button
                buttonType={BUTTON_TYPE_CLASSES.base}
                title={title}
                calories={calories}
                onClick={handleAddButtonClick}
              >
                Add
              </Button>
            </li>
          );
        });

        break;
      case "food":
        optionsListItems = searchResults.map((result) => {
          const { title, quantity, weight, calories } = result;
          return (
            <li key={uniqid()}>
              {quantity} {title} ({weight}g), {calories} calories
              <Button
                buttonType={BUTTON_TYPE_CLASSES.base}
                title={title}
                calories={calories}
                onClick={handleAddButtonClick}
              >
                Add
              </Button>
            </li>
          );
        });
        break;
      case "options":
        break;
      default:
        break;
    }

    return (
      <ul className="search-results">{searchResults && optionsListItems}</ul>
    );
  }
};
export default SearchResultsList;
