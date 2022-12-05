import { useEffect, useState } from "react";

const MakeFoodEntry = (props) => {
  const appIdAndKey = props.credentials;
  const [searchQuery, setSearchQuery] = useState("");
  const [showFoundResults, setShowFoundResults] = useState(false);

  useEffect(() => {
    setSearchQuery("3 zucchinis, 2tsp ketchup and 1 cup of rice");
  }, []);

  const callEndpoint = async () => {
    const endPoint = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...appIdAndKey,
        },
        body: JSON.stringify({
          query: searchQuery,
          timezone: "US/Eastern",
        }),
      });
      const data = await response.json();
      console.log(data.foods);
      props.getData(data.foods);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    const queryString = e.target.value;
    setSearchQuery(queryString);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={handleChange}
        defaultValue="3 zucchinis, 2tsp ketchup and 1 cup of rice"
      />
      <button onClick={callEndpoint}>Search</button>
    </div>
  );
};

export default MakeFoodEntry;
