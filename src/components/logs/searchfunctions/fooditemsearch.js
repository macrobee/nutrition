import {
  nutrientEndpoint,
  fetchMethodAndHeaders,
} from "../../../apidata/apidata";

//returns array of food nutrition info
export const getNutrientData = async (searchQuery) => {
  if (searchQuery) {
    try {
      const response = await fetch(nutrientEndpoint, {
        ...fetchMethodAndHeaders,
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();

      return data.foods;
    } catch (e) {
      console.log(e);
      return;
    }
  }
};
