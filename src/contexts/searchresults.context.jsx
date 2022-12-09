import { createContext, useState } from "react";

export const SearchResultsContext = createContext({
  searchTypes: {},
  searchType: "",
  setSearchType: ()=> null,
  searchResults: [],
  setSearchResults: () => null,
  savedResults: {},
  setSavedResults: () => null,
});

export const SearchResultsProvider = ({ children }) => {
  const [searchType, setSearchType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [savedResults, setSavedResults] = useState({ exercise: [], food: [] });
  const searchTypes = {
    exercise: "exercise",
    foodNutrition: "food",
    foodOptions: "options",
  };

  const value = {
    searchTypes,
    searchType,
    setSearchType,
    searchResults,
    setSearchResults,
    savedResults,
    setSavedResults,
  };

  return (
    <SearchResultsContext.Provider value={value}>
      {children}
    </SearchResultsContext.Provider>
  );
};
