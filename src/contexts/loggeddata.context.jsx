import { createContext, useState } from "react";

const editEntry = (currentEntries, entryToEdit) => {
  const newEntryList = currentEntries.map((entry) =>
    entry.id === entryToEdit.id ? entryToEdit : entry
  );
  return newEntryList;
};

const createNewEntry = (currentEntries, newEntry) => {
  let newEntryList;
  if (currentEntries.length) {
    newEntryList = [newEntry, ...currentEntries];
  } else {
    newEntryList = [newEntry];
  }
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

const sortEntriesByDate = (currentEntries) => {
  const sortedEntryList = currentEntries.sort((current, next)=>{
    const currentDate = new Date(current.date);
    const nextDate = new Date(next.date);
    return nextDate - currentDate ;
  });
  console.log(sortedEntryList);
  return sortedEntryList;
}

const defaultEntryList = [
  { id: 1, date: "2022-12-08", exercise: [], food: [] },
  { id: 2, date: "2022-12-08", exercise: [], food: [] },
  { id: 3, date: "2022-12-07", exercise: [], food: [] },
];

export const LoggedDataContext = createContext({
  entryList: [],
  setEntryList: () => null,
  editExistingEntry: () => null,
  addNewEntryToList: () => null,
  deleteExistingEntry: () => null,
  addDataToEntry: () => null,
  saveToLocalStorage: () => null,
  getDataFromLocalStorage: () => null,
});
// food/exercise entry looks like:
// {id: 2354234,
// date: 09/02/22,
// data: {
// food: [{food1}, {food2}],
// exercise: [{exercise1}, {exercise2}],
// }}

export const LoggedDataProvider = ({ children }) => {
  const editExistingEntry = (editedEntry) => {
    const newEntryList = editEntry(entryList, editedEntry);
    const sortedEntryList = sortEntriesByDate(newEntryList);
    setEntryList(sortedEntryList);
  };

  const addNewEntryToList = (newEntry) => {
    setEntryList(createNewEntry(entryList, newEntry));
  };

  const deleteExistingEntry = (entryToDelete) => {
    setEntryList(deleteEntry(entryList, entryToDelete));
  };

  const addDataToEntry = (entryToModify, fieldToEdit, newData) => {
    setEntryList(addEntryData(entryList, entryToModify, fieldToEdit, newData));
  };

  const saveToLocalStorage = () => {
    localStorage.clear();
    window.localStorage.setItem("data", JSON.stringify(entryList));
  };

  const getDataFromLocalStorage = () => {
    const savedData = JSON.parse(localStorage.getItem("data"));
    return savedData;
  };
  const [entryList, setEntryList] = useState({});

  const value = {
    entryList,
    setEntryList,
    editExistingEntry,
    addNewEntryToList,
    deleteExistingEntry,
    addDataToEntry,
    saveToLocalStorage,
    getDataFromLocalStorage,
  };

  return (
    <LoggedDataContext.Provider value={value}>
      {children}
    </LoggedDataContext.Provider>
  );
};
