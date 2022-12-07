import { useState, useContext } from "react";

import { getExerciseData } from "./searchfunctions/exercisesearch";
import { SearchInput, SearchButton, SearchLabel } from "./input.styles";

import { SearchResultsContext } from "../../contexts/searchresults.context";

const defaultSearchQuery = "";

const SearchExercise = () => {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
  const {setSearchResults, setSearchType, searchTypes} = useContext(SearchResultsContext);
  
  const retrieveExerciseData = async()=>{
    const results = await getExerciseData(searchQuery);
    await setSearchType(searchTypes.exercise);

    await setSearchResults(results);
  }

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
    <form onSubmit={handleSubmit}>
      <SearchLabel htmlFor="search-exercise">Search Exercise</SearchLabel>
      <SearchInput
        type="text"
        name="search-exercise"
        onChange={handleChange}
        placeholder="run 42km"
        value={searchQuery}
      />
      <SearchButton type="submit">Search</SearchButton>
    </form>
  );
};

export default SearchExercise;
