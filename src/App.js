import { useContext, useEffect } from "react";

import "./App.css";

import Header from "./components/header/header";
import Content from "./content/content";

import { LoggedDataContext } from "./contexts/loggeddata.context";

function App() {
  const { saveToLocalStorage, entryList } = useContext(LoggedDataContext);

  useEffect(() => {
    const updateLocalStorage = async () => {
      await saveToLocalStorage();
      console.log(entryList);
    };
    updateLocalStorage();
  }, [entryList]);

  return (
    <div className="App">
      <Header />
      <Content />
      {/* <MakeFoodEntry credentials={appIdAndKey} />
      <SearchFoodOptions credentials={appIdAndKey} />

      <SearchExercise credentials={appIdAndKey} />
      
      <DayLog credentials={appIdAndKey}/> */}
    </div>
  );
}

export default App;
