import "./App.css";
// import MakeFoodEntry from "./components/makefoodentry";
// import SearchExercise from "./components/searchexercise";
// import SearchFoodOptions from "./components/searchfoods";
// import DayLog from "./components/daylog";
import Header from "./components/header/header";
import Content from "./content/content";

// import { appIdAndKey } from "./apidata/apidata";

function App() {
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
