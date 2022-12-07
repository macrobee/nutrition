import { appIdAndKey, foodEndpoint } from "../../../apidata/apidata";

export const getFoodAutoFillOptions = async (searchQuery) => {
  if (searchQuery) {
    const endPoint = foodEndpoint + searchQuery;

    try {
      const response = await fetch(endPoint, {
        method: "GET",
        headers: { ...appIdAndKey },
      });
      const data = await response.json();
      console.log(data);
      const options = {
        commonFoods: data.common.slice(0, 5),
        brandedFoods: data.branded.slice(0, 5),
      };
      console.log(options);
      return options;
    } catch (e) {
      console.log(e);
      return;
    }
  }
};
