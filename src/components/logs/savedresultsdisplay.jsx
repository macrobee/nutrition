import { useContext } from "react";
import uniqid from "uniqid";

import { ReactComponent as Trash } from "../../assets/trash.svg";

import { LoggedDataContext } from "../../contexts/loggeddata.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button";

const SavedResultsDisplay = (props) => {
  const { title, searchType, logId } = props;
  const { entryList, editExistingEntry } = useContext(LoggedDataContext);

  const currentEntry = entryList.find((entry) => entry.id === logId);
  const loggedItemsInEntry = entryList.find((entry) => entry.id === logId)[searchType];

  const handleDeleteButtonClick = (e) => {
    const itemToDeleteTitle = e.target.getAttribute("id");
    console.log(itemToDeleteTitle);
    const filteredLoggedItemsInEntry = loggedItemsInEntry.filter(
      (item) => item.title !== itemToDeleteTitle
    );
    const editedEntry = {
      ...currentEntry,
      [searchType]: filteredLoggedItemsInEntry,
    };
    editExistingEntry(editedEntry);
  };

  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {console.log(loggedItemsInEntry)}
        {loggedItemsInEntry.map((item) => {
          console.log(item.title);
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
