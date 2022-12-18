import { useContext } from "react";
import uniqid from "uniqid";

import { ReactComponent as Trash } from "../../assets/trash.svg";
import { ActiveLogContext } from "../../contexts/activelog.context";

import { LoggedDataContext } from "../../contexts/loggeddata.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button";

const SavedResultsDisplay = (props) => {
  const { title, searchType, logId } = props;
  const { entryList, editExistingEntry } = useContext(LoggedDataContext);
  const {activeLog, setActiveLog} = useContext(ActiveLogContext);

  // const activeLog = entryList.find((entry) => entry.id === logId);
  
  const loggedItemsInEntry = entryList.find((entry) => entry.id === logId)[searchType];

  const updateEntry = async (newData) => {
    const editedEntry = {
      ...activeLog,
      [searchType]: newData,
    };
    await editExistingEntry(editedEntry);
    await setActiveLog(editedEntry);
  }
  const handleDeleteButtonClick = (e) => {
    const itemToDeleteTitle = e.target.getAttribute("id");
    const filteredLoggedItemsInEntry = loggedItemsInEntry.filter(
      (item) => item.title !== itemToDeleteTitle
    );
    
    updateEntry(filteredLoggedItemsInEntry);
  };

  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {loggedItemsInEntry.map((item) => {
          const id = uniqid();
          return (<li key={id}>
            <span>&#x2022;</span>
            {searchType === "exercise"
              ? item.title + " " + item.quantity + " min"
              : item.quantity + " " + item.title}{" "}
            ({item.calories} cal){" "}
            <Button buttonType={BUTTON_TYPE_CLASSES.delete} id={item.title} onClick={handleDeleteButtonClick}>
              {" "}
              <Trash fill={"#f2635c"} height={"15px"} />
            </Button>
          </li>)
        })}
      </ul>
    </div>
  );
};

export default SavedResultsDisplay;
