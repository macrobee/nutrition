import { useState, useContext } from "react";

import { UserContext } from "../../contexts/userInformation.context";

import "./profile.styles.css";
import { Input } from "../input/input.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import { useEffect } from "react";

// 45–65% of your daily calories from carbs, 20–35% from fats and 10–35% from protein
const Profile = () => {
  const {
    userPhysicalInfo,
    setUserPhysicalInfo,
    user,
    setUser,
    userMacroGoals,
    setUserMacroGoals,
    setProfileIsOpen,
  } = useContext(UserContext);
  const [inputFields, setInputFields] = useState({
    ...userMacroGoals,
    name: user.personName,
    gender: userPhysicalInfo.gender,
    weight: userPhysicalInfo.weight_kg,
    height: userPhysicalInfo.height_cm,
    age: userPhysicalInfo.age,
  });
  const [proteinPercent, setProteinPercent] = useState(userMacroGoals.protein);

  useEffect(() => {
    setProteinPercent(100 - inputFields.carbs - inputFields.fats);
    if (proteinPercent != inputFields.protein){
      setInputFields({...inputFields, protein: proteinPercent});
    }
  }, [inputFields]);

  const handleChange = (e) => {
    console.log(inputFields);
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value,  });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);
    console.log(user);
    setUser({ ...user, personName: inputFields.name });
    setUserPhysicalInfo({
      gender: inputFields.gender,
      weight_kg: inputFields.weight,
      height_cm: inputFields.height,
      age: inputFields.age,
    });
    setUserMacroGoals({
      carbs: inputFields.carbs,
      fats: inputFields.fats,
      protein: inputFields.protein,
    });
    setProfileIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit} className="profile">
      <h3>Edit your profile</h3>
      <label htmlFor="name">Name: </label>
      <Input
        name="name"
        type="text"
        placeholder={user.personName}
        onChange={handleChange}
      />

      <h4>Physical Information</h4>
      <div className="gender-input">
        <label htmlFor="gender">Sex: </label>
        <select
          type="text"
          name="gender"
          onChange={handleChange}
          defaultValue={userPhysicalInfo.gender}
        >
          <option value="male">Male</option>{" "}
          <option value="female">Female</option>
        </select>
      </div>
      <div className="age-input">
        <label htmlFor="age">Age: </label>
        <Input
          type="number"
          min="1"
          max="100"
          name="age"
          placeholder={userPhysicalInfo.age}
          onChange={handleChange}
        />
      </div>
      <div className="weight-input">
        <label htmlFor="weight_kg" placeholder={userPhysicalInfo.weight_kg}>
          Weight (kg):
        </label>
        <Input
          type="number"
          name="weight_kg"
          min="1"
          max="300"
          placeholder="60"
          onChange={handleChange}
        />
      </div>
      <div className="height-input">
        <label htmlFor="height_cm" placeholder={userPhysicalInfo.height_cm}>
          Height (cm):{" "}
        </label>
        <Input
          type="number"
          min="50"
          max="250"
          name="height_cm"
          placeholder="160"
          onChange={handleChange}
        />
      </div>

      <h4>Macro goals</h4>
      <div className="macro-input-container">
        <div className="carbs-input macro">
          <label htmlFor="carbs">Carbs</label>
          <Input
            type="range"
            name="carbs"
            id="carbs"
            min="45"
            max="65"
            defaultValue={userMacroGoals.carbs}
            onChange={handleChange}
          />
          {inputFields.carbs} %
        </div>
        <div className="fats-input macro">
          <label htmlFor="fats">Fats</label>
          <Input
            type="range"
            name="fats"
            id="fats"
            min="20"
            max="35"
            defaultValue={userMacroGoals.fats}
            onChange={handleChange}
          />
          {inputFields.fats} %
        </div>
        <div className="protein-input macro">
          <label htmlFor="protein">Protein</label>
          <Input
            type="range"
            name="protein"
            id="protein"
            min="10"
            max="35"
            value={proteinPercent}
            onChange={handleChange}
          />
          {proteinPercent} %
        </div>
      </div>

      <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
        Save
      </Button>
    </form>
  );
};

export default Profile;
