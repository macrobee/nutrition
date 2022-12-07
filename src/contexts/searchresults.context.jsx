import { createContext, useState } from "react";


export const SearchResultsContext = createContext({
  searchTypes: {},
  searchType: "",
  searchResults: [],
  setSearchResults: () => null,
  
});

export const SearchResultsProvider = ({ children }) => {
  const [searchType, setSearchType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchTypes = {exercise: "exercise", foodNutrition: "nutrition", foodOptions: "food"}

  const value = { searchTypes, searchType, setSearchType, searchResults, setSearchResults };

  return (
    <SearchResultsContext.Provider value={value}>
      {children}
    </SearchResultsContext.Provider>
  );
};
