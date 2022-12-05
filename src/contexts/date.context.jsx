import { useEffect } from "react";
import { createContext, useState } from "react";

export const DateContext = createContext({
  currentDateObj: {},
  setCurrentDateObj: () => null,
  currentDateStr: "",
  setCurrentDateStr: () => null,
});

export const DateProvider = ({ children }) => {
  const [currentDateObj, setCurrentDateObj] = useState({});
  const [currentDateStr, setCurrentDateStr] = useState("");
  
  useEffect(() => {
    const today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const todayString = mm + "/" + dd + "/" + yyyy;

    setCurrentDateObj(today);
    setCurrentDateStr(todayString);
  }, []);

  const value = {
    currentDateObj,
    setCurrentDateObj,
    currentDateStr,
    setCurrentDateStr,
  };
  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
