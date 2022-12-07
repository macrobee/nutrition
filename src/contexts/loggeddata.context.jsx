import { createContext, useState } from "react";

export const LoggedDataContext = createContext({
  foodEntries: [],
  setFoodEntries: () => null,
  exerciseEntries: [],
  setExerciseEntries: () => null,
});

export const LoggedDataProvider = ({ children }) => {
  const [foodEntries, setFoodEntries] = useState([]);
  const [exerciseEntries, setExerciseEntries] = useState([]);

  const value = {
    foodEntries,
    setFoodEntries,
    exerciseEntries,
    setExerciseEntries,
  };

  return (
    <LoggedDataContext.Provider value={value}>
      {children}
    </LoggedDataContext.Provider>
  );
};
