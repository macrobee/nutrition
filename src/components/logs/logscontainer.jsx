import { useContext } from "react";
import uniqid from "uniqid";

import { SearchResultsProvider } from "../../contexts/searchresults.context";
import { LoggedDataContext } from "../../contexts/loggeddata.context";
import { DateContext } from "../../contexts/date.context";

import DayLog from "./daylog";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import "../styles/logscontainer.styles.css";

const LogsContainer = () => {
  const { entryList, addNewEntryToList } = useContext(LoggedDataContext);
  const { currentDateStr, currentDateObj, getDateStrFromDateObj } =
    useContext(DateContext);

  const handleButtonClick = () => {
    let newEntryDateObj = currentDateObj;
    let newEntryDateStr = currentDateStr;

    if (entryList.length){ //if entryList contains entries, give new entry a new date
      newEntryDateObj = new Date(entryList[0].date); //this is giving a date 1 day before most recent date for some reason

      newEntryDateObj.setDate(newEntryDateObj.getDate() + 2); 
      newEntryDateStr = getDateStrFromDateObj(newEntryDateObj);
    }

    const newEntry = {
      id: uniqid(),
      date: newEntryDateStr,
      dateObj: newEntryDateObj,
      exercise: [],
      food: [],
    };
    addNewEntryToList(newEntry);
  };
  return (
    <div className="logs-container">
      <Button
        buttonType={BUTTON_TYPE_CLASSES.add}
        onClick={handleButtonClick}
        id="new-log-button"
      >
        Create new log
      </Button>
      {entryList.length
        ? entryList.map((entry) => {
            return (
              <SearchResultsProvider key={entry.id}>
                <DayLog key={entry.id} id={entry.id} date={entry.date} />
              </SearchResultsProvider>
            );
          })
        : null}
    </div>
  );
};

export default LogsContainer;
