
import { createContext, useState, useEffect } from "react";

export const DateContext = createContext({
  currentDateObj: {},
  setCurrentDateObj: () => null,
  currentDateStr: "",
  setCurrentDateStr: () => null,
  getDateStrFromDateObj: () => null,
});

export const DateProvider = ({ children }) => {
  const [currentDateObj, setCurrentDateObj] = useState({});
  const [currentDateStr, setCurrentDateStr] = useState("");

  const getDateStrFromDateObj = (date) =>{
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();

    const todayString = yyyy + "-" + mm + "-" + dd;
    return todayString;
  }
  useEffect(() => {
    const today = new Date();
    const todayString = getDateStrFromDateObj(today);

    setCurrentDateObj(today);
    setCurrentDateStr(todayString);
  }, []);

  const value = {
    currentDateObj,
    setCurrentDateObj,
    currentDateStr,
    setCurrentDateStr,
    getDateStrFromDateObj,
  };
  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
