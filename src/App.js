import { useContext, useEffect } from "react";

import "./App.css";

import Header from "./components/header/header";
import Content from "./content/content";
import LoadingScreen from "./components/loading/loadingscreen";

import { LoggedDataContext } from "./contexts/loggeddata.context";
import { UserContext } from "./contexts/userInformation.context";

function App() {
  const {
    saveToLocalStorage,
    entryList,
  } = useContext(LoggedDataContext);
  const { user, userPhysicalInfo, userMacroGoals } = useContext(UserContext);

  useEffect(() => {
    const updateLocalStorage = async () => {
      await saveToLocalStorage();
      console.log(JSON.parse(localStorage.getItem("data")));
    };
    updateLocalStorage();
  }, [entryList]);

  // useEffect(()=>{
  //   window.localStorage.setItem("user", JSON.stringify(user));
  //   window.localStorage.setItem("userphysicalinfo", JSON.stringify(userPhysicalInfo));
  //   window.localStorage.setItem("usermacrogoals", JSON.stringify(userMacroGoals));
  // },[user,userPhysicalInfo, userMacroGoals])

  return (
    <div className="App">
      {user.personName === null ? (
        <LoadingScreen />
      ) : (
        <div>
          <Header />
          <Content />
        </div>
      )}
    </div>
  );
}

export default App;
