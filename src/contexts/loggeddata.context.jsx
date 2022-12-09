import { createContext, useState } from "react";

const editEntry = (currentEntries, entryToEdit) => {
  const newEntryList = currentEntries.map((entry) =>
    entry.id === entryToEdit.id ? entryToEdit : entry
  );
  return newEntryList;
};

const createNewEntry = (currentEntries, newEntry) => {
  const newEntryList = [...currentEntries, newEntry];
  return newEntryList;
};

const deleteEntry = (currentEntries, entryToDelete) => {
  const newEntryList = currentEntries.filter(
    (entry) => entryToDelete.id !== entry.id
  );
  return newEntryList;
};

const addEntryData = (currentEntries, entryToModify, fieldToEdit, newData) => {
  const editedEntry = { ...entryToModify, [fieldToEdit]: newData };
  const newEntryList = currentEntries.map((entry) =>
    entry.id === entryToModify.id ? editedEntry : entry
  );
  return newEntryList;
};

const defaultEntryList = [
  { id: 1, date: "2022-12-08", exercise: [], food: [] },
  { id: 2, date: "2022-12-07", exercise: [], food: [] },
];

export const LoggedDataContext = createContext({
  entryList: [],
  setEntryList: () => null,
  editExistingEntry: () => null,
  addNewEntryToList: () => null,
  deleteExistingEntry: () => null,
  addDataToEntry: () => null,
});
// food/exercise entry looks like:
// {id: 2354234,
// date: 09/02/22,
// data: {
// food: [{food1}, {food2}],
// exercise: [{exercise1}, {exercise2}],
// }}

export const LoggedDataProvider = ({ children }) => {
  const [entryList, setEntryList] = useState(defaultEntryList);

  const editExistingEntry = (editedEntry) => {
    setEntryList(editEntry(entryList, editedEntry));
  };

  const addNewEntryToList = (newEntry) => {
    setEntryList(createNewEntry(entryList, newEntry));
  };

  const deleteExistingEntry = (entryToDelete) => {
    setEntryList(deleteEntry(entryList, entryToDelete));
  };

  const addDataToEntry = (entryToModify, fieldToEdit, newData) =>{
    setEntryList(addEntryData(entryList, entryToModify, fieldToEdit, newData));
  }
  const value = {
    entryList,
    setEntryList,
    editExistingEntry,
    addNewEntryToList,
    deleteExistingEntry,
    addDataToEntry,
  };

  return (
    <LoggedDataContext.Provider value={value}>
      {children}
    </LoggedDataContext.Provider>
  );
};
