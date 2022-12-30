import { useContext, useState } from "react";
import uniqid from "uniqid";
import { ActiveLogContext } from "../../contexts/activelog.context";

import { LoggedDataContext } from "../../contexts/loggeddata.context";
import { SearchResultsContext } from "../../contexts/searchresults.context";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import "../styles/searchresultslist.styles.css";

const SearchResultsList = (props) => {
  const { searchResults, searchType } = useContext(SearchResultsContext);
  const { editExistingEntry } =  useContext(LoggedDataContext);
  const {setActiveLog, activeLog} = useContext(ActiveLogContext);


  let optionsListItems = null;

  const updateEntry = async (fieldToUpdate, newData) => {
    const editedEntry = {
      ...activeLog,
      [fieldToUpdate]: newData,
    }
    await editExistingEntry(editedEntry);
    // const updatedCurrentEntry = entryList.find((entry) => entry.id === logId);
    await setActiveLog(editedEntry);
    // console.log(activeLog)
  }
  const handleAddButtonClick = (e) => {
    const title = e.currentTarget.getAttribute("title"); //name of thing to add

    const searchResultData = searchResults.find(
      (result) => result.title === title
    );
    // get data from search (newData)

    const newData = [...activeLog[searchType], searchResultData];
    //create array containing old and new data

    updateEntry(searchType, newData);
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
              <span>&#x2022;</span>
              {Math.round(quantity)} minutes {title}, {Math.round(calories)}{" "}
              calories
              <Button
                buttonType={BUTTON_TYPE_CLASSES.add}
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
              <span>&#x2022;</span>
              {quantity} {title} ({weight}g), {calories} calories
              <Button
                buttonType={BUTTON_TYPE_CLASSES.add}
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
      default:
        break;
    }

    return (
      <ul className="search-results">{searchResults && optionsListItems}</ul>
    );
  }
};
export default SearchResultsList;
