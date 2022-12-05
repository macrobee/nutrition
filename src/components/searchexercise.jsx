import { useEffect, useState } from "react";

const SearchExercise = (props) => {
  const appIdAndKey = props.credentials;
  const defaultPersonInfo = {
    gender: "female",
    weight_kg: 63,
    height_cm: 168,
    age: 27,
  };

  const [searchQuery, setSearchQuery] = useState(defaultPersonInfo);
  useEffect(() => {
    setSearchQuery({ query: "run 42km", ...defaultPersonInfo });
    console.log(searchQuery);
  }, []);

  const getExerciseData = async () => {
    const endPoint = "https://trackapi.nutritionix.com/v2/natural/exercise";

    console.log(searchQuery);
    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...appIdAndKey,
        },
        body: JSON.stringify(searchQuery),
      });
      const data = await response.json();
      console.log(data);
      props.getData(data.exercises);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    const queryString = e.target.value;
    setSearchQuery({ query: queryString, ...defaultPersonInfo });
  };
  return (
    <div className="search-bar">
      <input type="text" onChange={handleChange} defaultValue="run 42km" />
      <button onClick={getExerciseData}>Search</button>
    </div>
  );
};

export default SearchExercise;
