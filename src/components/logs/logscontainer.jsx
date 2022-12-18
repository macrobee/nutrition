import { useContext } from "react";
import uniqid from "uniqid";

import { SearchResultsProvider } from "../../contexts/searchresults.context";
import { LoggedDataContext } from "../../contexts/loggeddata.context";
import { DateContext } from "../../contexts/date.context";
import {ActiveLogContext} from "../../contexts/activelog.context"


import DayLog from "./daylog";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import './logscontainer.styles.css';



const LogsContainer = () => {
  const { entryList, addNewEntryToList } = useContext(LoggedDataContext);
  const { currentDateStr } = useContext(DateContext);

  const handleButtonClick = () => {
    const newEntry = {
      id: uniqid(),
      date: currentDateStr,
      exercise: [],
      food: [],
    };
    addNewEntryToList(newEntry);
  };
  return (
    <div className="logs-container">
      <Button buttonType={BUTTON_TYPE_CLASSES.add} onClick={handleButtonClick} id="new-log-button">
        Create new log
      </Button>
      {entryList.length ? entryList.map((entry) => {
        return (
          <SearchResultsProvider key={entry.id}>
            <DayLog key={entry.id} id={entry.id} date={entry.date} />
          </SearchResultsProvider>
        );
      }) : null}
    </div>
  );
};

export default LogsContainer;
