import { createContext, useState, useEffect } from "react";

const icons = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];
const getIconName = (icon) => {
  const letterArray = icon.split("");
  const firstLetter = letterArray[0].toUpperCase();
  const titleCaseArray = [firstLetter, ...letterArray.slice(1)];
  const titleCaseName = titleCaseArray.join("");
  return titleCaseName;
};

const defaultPersonInfo = {
  gender: "female",
  weight_kg: 63,
  height_cm: 168,
  age: 27,
};

export const blankPerson = {
  personName: null,
  photoUrl: `https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg`,
} 
export const samplePerson = {
  personName: "Alex",
  photoUrl: `https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg`,
};

const defaultMacroGoals = {
  carbs: 65,
  fats: 24,
  protein: 11,
};

export const UserContext = createContext({
  userPhysicalInfo: {},
  setUserPhysicalInfo: () => null,
  user: {},
  setUser: () => null,
  userMacroGoals: {},
  userCaloricGoals: {},
  profileIsOpen: false,
  setProfileIsOpen: () => null,
});

export const UserProvider = ({ children }) => {
  const [userPhysicalInfo, setUserPhysicalInfo] = useState(defaultPersonInfo);
  const [user, setUser] = useState(blankPerson);
  const [userMacroGoals, setUserMacroGoals] = useState(defaultMacroGoals);
  const [userCaloricGoals, setUserCaloricGoals] = useState({});
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  useEffect(() => {
    const { gender, age, weight_kg, height_cm } = userPhysicalInfo;
    setUserCaloricGoals({
      calories: 10 * weight_kg + 6.25 * height_cm - 5 * age + 5 + (gender === "female" ? -166 : null),
    });
  }, [userPhysicalInfo]);

  const value = {
    userPhysicalInfo,
    setUserPhysicalInfo,
    user,
    setUser,
    userMacroGoals,
    setUserMacroGoals,
    userCaloricGoals,
    setUserCaloricGoals,
    profileIsOpen,
    setProfileIsOpen,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
