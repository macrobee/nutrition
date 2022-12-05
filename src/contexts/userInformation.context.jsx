import { createContext, useState } from "react";

const icons = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison","psychic", "rock", "steel", "water"]
const getIconName = (icon) => {
  const letterArray = icon.split("");
  const firstLetter = letterArray[0].toUpperCase();
  const titleCaseArray = [firstLetter, ...letterArray.slice(1)];
  const titleCaseName = titleCaseArray.join("");
  return titleCaseName;
}

const defaultPersonInfo = {
  gender: "female",
  weight_kg: 63,
  height_cm: 168,
  age: 27,
};
const defaultPerson = {
  personName: "User1",
  photoUrl:
    `https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg`,
};


export const UserContext = createContext({
  userPhysicalInfo: {},
  setuserPhysicalInfo: () => null,
  user: "",
  setUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [userPhysicalInfo, setuserPhysicalInfo] = useState(defaultPersonInfo);
  const [user, setUser] = useState(defaultPerson);

  // useEffect(()=> {
  //     setuserPhysicalInfo(defaultPersonInfo);
  //     setUser(defaultPerson);
  // }, []);

  const value = { userPhysicalInfo, setuserPhysicalInfo, user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
