import { useState, useContext } from "react";

import { getExerciseData } from "./searchfunctions/exercisesearch";
import { getExerciseDataFromSearchResults } from "./searchfunctions/parseexercisedata";

import { Label } from "../styles/input.styles";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button";
import { Input } from "../input/input.styles";
import '../styles/searchexercise.styles.css';


import { SearchResultsContext } from "../../contexts/searchresults.context";

const defaultSearchQuery = "";

const SearchExercise = () => {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const {
    searchResults,
    setSearchResults,
    searchType,
    setSearchType,
    searchTypes,
  } = useContext(SearchResultsContext);

  const retrieveExerciseData = async () => {
    const results = await getExerciseData(searchQuery);
    await setSearchType(searchTypes.exercise);
    const parsedData = getExerciseDataFromSearchResults(results);

    await setSearchResults(parsedData);
  };

  const handleChange = (e) => {
    const queryString = e.target.value;
    setSearchQuery(queryString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResults([]);
    retrieveExerciseData(); //saves search results into searchResultsContext
    setSearchQuery(defaultSearchQuery); //resets form field
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <Label htmlFor="search-exercise">Search exercise</Label>
      <div className="input-and-button">
        <Input
          type="text"
          name="search-exercise"
          onChange={handleChange}
          placeholder="run 42km"
          value={searchQuery}
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Search</Button>
      </div>
    </form>
  );
};

export default SearchExercise;
