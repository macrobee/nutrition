import { useEffect, useState } from "react";
import uniqid from "uniqid";

const SearchFoodOptions = (props) => {
  const appIdAndKey = props.credentials;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");

  useEffect(() => {
    const getData = setTimeout(() => {
      getAutoFillOptions();
      console.log("went to get autofill options");
    }, 1000);
    return () => clearTimeout(getData);
  }, [searchQuery]);

  const getAutoFillOptions = async () => {
    if (searchQuery) {
      const endPoint = `https://trackapi.nutritionix.com/v2/search/instant?query=${searchQuery}`;

      try {
        const response = await fetch(endPoint, {
          method: "GET",
          headers: { ...appIdAndKey },
        });
        const data = await response.json();
        console.log(data);
        const options = data.common.slice(0, 5);
        setSearchResults(options);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleChange = (e) => {
    const queryString = e.target.value;
    console.log(`input value is ${e.target.value}`);
    console.log(`searchQuery is ${searchQuery}`);
    setSearchQuery(queryString);
  };
  return (
    <div className="search-bar">
      <label htmlFor="search-foods"></label>
      <input
        type="text"
        name="search-foods"
        onChange={handleChange}
        defaultValue="red pepper"
      />
      <ul>
        {searchResults
          ? searchResults.map((result) => {
              return (
                <li key={uniqid()}>
                  <img
                    src={result.photo.thumb}
                    alt="thumbnail"
                    width="30px"
                  ></img>{" "}
                  {result["food_name"]} <button>Add</button>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default SearchFoodOptions;
