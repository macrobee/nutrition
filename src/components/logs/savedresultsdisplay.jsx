import { useContext } from "react";
import uniqid from "uniqid";

import { LoggedDataContext } from "../../contexts/loggeddata.context";

const SavedResultsDisplay = (props) => {
  const { title, searchType, logId } = props;
  const { entryList } = useContext(LoggedDataContext);

  const loggedItemsInEntry = entryList.find((entry) => entry.id === logId)[
    searchType
  ];

  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {loggedItemsInEntry.map((item) => (
          <li key={uniqid()}>
            {searchType === "exercise"
              ? item.title + " " + item.quantity + " min"
              : item.quantity + " " + item.title}{" "}
            ({item.calories} cal)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedResultsDisplay;
