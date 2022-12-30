import { useContext } from "react";

import { UserContext } from "../../contexts/userInformation.context";
import { LoggedDataContext } from "../../contexts/loggeddata.context";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import { samplePerson } from "../../contexts/userInformation.context";
import { sampleEntryList } from "../summary/data";

import "../styles/loadingscreen.styles.css";

const LoadingScreen = () => {
  const { setUser } = useContext(UserContext);
  const { setEntryList, savedEntryList } =
    useContext(LoggedDataContext);

  const handleNewUserClick = () => {
    setUser(samplePerson);
    setEntryList({});
  };
  const handleSavedClick = () => {
    const savedEntryListWithDates = savedEntryList.map((entry) => {
        const dateObject = new Date(entry.date);
        return { ...entry, dateObj: dateObject };
      });
    setEntryList(savedEntryListWithDates);
    setUser(samplePerson);
    //load saved data and physical info
  };
  const handleDefaultClick = () => {
    //load sample data and physical info
    const sampleEntryListWithDates = sampleEntryList.map((entry) => {
      const dateObject = new Date(entry.date);
      return { ...entry, dateObj: dateObject };
    });
    setEntryList(sampleEntryListWithDates);
    setUser(samplePerson);
  };
  return (
    <div className="loading-screen">
      <h1>Macro tracker</h1>
      <p>Powered by Nutritionix API</p>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.base}
        onClick={handleNewUserClick}
      >
        Create new file
      </Button>
      <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={handleSavedClick}>
        Load saved file
      </Button>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.base}
        onClick={handleDefaultClick}
      >
        Load sample file
      </Button>
      <div id="moving-span-container">
        <span id="moving-span">?</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
